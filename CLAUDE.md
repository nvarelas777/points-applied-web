@AGENTS.md

# CLAUDE.md — points-applied-web

Next.js (App Router) port of Points Applied's frontend. See the root
[Points Applied CLAUDE.md](../CLAUDE.md) for product/domain context. This
file covers conventions specific to this repo. Read `AGENTS.md` first — it
points to version-matched Next.js docs bundled in
`node_modules/next/dist/docs/`; this Next.js version has real breaking
changes vs. older training data (e.g. `middleware.ts` is now `proxy.ts`,
see below).

---

## Tech Stack

| Layer         | Tool                                    |
|---------------|------------------------------------------|
| Framework     | Next.js 16 (App Router, React 19)        |
| Styling       | Tailwind CSS v4                          |
| UI components | shadcn/ui (Radix primitives, owned code) |
| Auth          | Clerk (`@clerk/nextjs`)                  |
| Forms         | React Hook Form + Zod                    |
| Data fetching | Server Components + Server Actions       |

This repo talks to the same `CreditCardApi` (.NET 8 Lambda) backend as
`nick-app`. It does not have its own database.

---

## Why Next.js instead of continuing in Angular (nick-app)

Public/marketing/content surface area (home, about, FAQ, legal, future
blog) benefits from Next's SSG/ISR and SEO tooling, and AI coding agents
are generally more fluent in current Next.js/React idioms than Angular's
newer signals APIs. This is a full port, not a marketing-site-only split —
plan for feature parity work as pages migrate over, not a rewrite of
everything on day one.

---

## Public vs. Authenticated Routes

Routes are split into two route groups under `src/app/`:

- `(marketing)/` — public pages (home, about, FAQ, legal). No auth
  required. Optimize these for SSG/ISR and SEO (`generateMetadata`,
  static rendering where possible).
- `(dashboard)/` — authenticated app pages (card portfolio, notifications,
  etc.). `src/app/(dashboard)/layout.tsx` calls `auth.protect()` — this is
  the single source of truth for gating the dashboard, not `src/proxy.ts`.

  **Auth checks are resource-based, not route-based.** Clerk deprecated
  `createRouteMatcher`-driven route protection in proxy/middleware: path
  matching there can diverge from how Next.js actually routes a request
  and leave protected resources reachable. `src/proxy.ts` only runs
  `clerkMiddleware()` for session sync — it does not gate routes. Every
  protected page, layout, route handler, or Server Action must call
  `auth.protect()` (or check `auth()`) itself. Never add route-matching
  logic back into `src/proxy.ts` to "protect" a path.

### `proxy.ts`, not `middleware.ts`

Next.js 16 deprecated and renamed the `middleware` file convention to
`proxy` (`src/proxy.ts`, exporting a `proxy` function). Do not create a
`middleware.ts` file — it will not run. See
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.

---

## Data Fetching & Mutations

**Default to Server Components fetching data directly** — no client-side
data-fetching library (no TanStack Query, no `useEffect` fetch).

```tsx
// GOOD — fetch in a Server Component
export default async function DashboardPage() {
  const cards = await apiFetch<Card[]>("/cards");
  return <CardList cards={cards} />;
}
```

**Mutations go through Server Actions**, not client-side `fetch` calls to
route handlers, unless the UI genuinely needs a REST-style endpoint (e.g.
a webhook target).

```tsx
// GOOD — Server Action colocated with the form that uses it
"use server";

export async function addCard(formData: FormData) {
  await apiFetch("/cards", { method: "POST", body: ... });
  revalidatePath("/dashboard");
}
```

All calls to `CreditCardApi` go through `src/lib/api.ts` (`apiFetch`),
which attaches the Clerk session token server-side. Never call
`CreditCardApi` directly from a Client Component — it has no way to attach
auth safely from the browser.

**Only use a client-side data-fetching hook** when a page needs
client-driven interactivity a Server Component can't provide (e.g. polling,
optimistic UI beyond what `useOptimistic` covers). Reach for `useSWR`
before introducing a new dependency, and keep the fetch scoped to a
route handler, not a direct call to `CreditCardApi`.

---

## Forms

Use React Hook Form + Zod for all forms. Define the schema once and reuse
it for both client-side validation and Server Action input parsing.

```tsx
const cardSchema = z.object({
  cardName: z.string().min(1).max(100),
  creditLimit: z.number().min(0).nullable(),
});

const form = useForm<z.infer<typeof cardSchema>>({
  resolver: zodResolver(cardSchema),
});
```

- Never use uncontrolled inputs without React Hook Form registration.
- Parse/validate Server Action `FormData` with the same Zod schema the
  client form uses — don't trust client-side validation alone.

---

## Components

- **shadcn/ui components are owned code** — they live in
  `src/components/ui/` and get edited directly, not treated as a
  black-box dependency. Prefer adding new shadcn components via
  `npx shadcn@latest add <component>` over hand-rolling primitives Radix
  already solves (dialogs, dropdowns, popovers).
- Feature-specific components go in `src/components/<feature>/`. Shared,
  cross-feature components go in `src/components/`.
- Server Components by default. Add `"use client"` only when a component
  needs interactivity, hooks, or browser APIs — push the boundary as low
  in the tree as possible.

---

## Typography — use these, don't reinvent them

Defined in `src/app/globals.css`. Bare heading elements (`h1`–`h4`)
already get the right size/weight by default via `@layer base` — reach
for the `.pa-hN` class form only when a non-heading element (e.g. a
`<div>` or `<span>` showing a card name) needs heading-level type.

| Class                                              | Role                                                |
|-----------------------------------------------------|------------------------------------------------------|
| `pa-h1` (or bare `<h1>`)                             | Page-level hero headline                              |
| `pa-h2` (or bare `<h2>`)                             | Section headline                                      |
| `pa-h3` (or bare `<h3>`)                             | Card/dialog section title (e.g. "Card Information")   |
| `pa-h4` (or bare `<h4>`)                             | Card title / prominent inline data value              |
| `pa-label`                                           | Small uppercase eyebrow/label text                    |
| `pa-body`                                            | Default body copy                                     |
| `pa-metric-sm` / `pa-metric-md` / `pa-metric-lg`     | Tabular numeric figures (stat tiles, dollar amounts)   |

**Neutral color scale:** use Tailwind's `slate-*` palette for grays
(`text-slate-600`, `border-slate-100`, etc.), never `gray-*` — the two
read as different colors side by side, and mixing them is what makes a
UI look assembled from mismatched pieces rather than designed.

Repeated section headers (e.g. "Card Information" appearing in both a
form and its read-only detail view) belong in a shared component like
`SectionTitle` (`src/components/dashboard/section-title.tsx`), not
copy-pasted with independently hand-picked classes per call site.

---

## Anti-Patterns — Never Do These

| Anti-pattern                                              | What to do instead                                   |
|-------------------------------------------------------------|--------------------------------------------------------|
| `middleware.ts`                                            | `src/proxy.ts` (Next 16 renamed convention)             |
| Client-side `fetch` directly to `CreditCardApi`             | Server Component fetch or Server Action via `apiFetch` |
| `useEffect` + `fetch` for initial page data                 | Fetch in the Server Component                          |
| Gating a route via `createRouteMatcher` in `src/proxy.ts`    | Call `auth.protect()` in that page/layout/Server Function directly (deprecated by Clerk — see above) |
| New protected page/action with no `auth.protect()` call      | Every protected page, layout, route handler, and Server Action checks auth itself |
| Hand-rolled dialog/dropdown/popover                         | `npx shadcn@latest add <component>`                     |
| `"use client"` on a whole page for one interactive widget    | Push `"use client"` down to just that widget            |
| Manually attaching Clerk tokens to requests                  | Use `apiFetch` in `src/lib/api.ts`                      |
| Hand-rolled `text-*`/`font-*` combos for headings/labels     | Use the typography scale above                          |
| Tailwind's `gray-*` palette                                  | `slate-*` (the app's canonical neutral scale)            |

---

## File Structure

```
src/
├── app/
│   ├── (marketing)/      # Public pages — SSG/ISR, SEO-optimized
│   ├── (dashboard)/      # Authenticated app pages
│   └── layout.tsx        # Root layout, wraps app in ClerkProvider
├── components/
│   ├── ui/                # shadcn/ui primitives (owned, editable)
│   └── <feature>/          # Feature-specific components
├── lib/
│   ├── api.ts              # apiFetch — server-only CreditCardApi client
│   └── utils.ts
├── types/                    # Domain types (Card, UserCreditCard, etc.)
└── proxy.ts                 # Clerk session sync — does not gate routes
```

---

## Running the App

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint      # eslint
```

Copy `.env.local.example` to `.env.local` and fill in Clerk keys and
`CREDIT_CARD_API_BASE_URL` before running.
