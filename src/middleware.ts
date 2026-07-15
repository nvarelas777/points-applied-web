import { clerkMiddleware } from "@clerk/nextjs/server";

// Route-based protection via createRouteMatcher is deprecated by Clerk —
// path matching here can diverge from how Next.js actually routes a
// request. Auth is enforced per-resource instead: see
// src/app/(dashboard)/layout.tsx (`auth.protect()`), and any protected
// Server Action must call `auth.protect()`/`auth()` itself.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
