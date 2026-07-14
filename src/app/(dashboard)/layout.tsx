import { auth } from "@clerk/nextjs/server";
import { SiteHeader } from "@/components/site-header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Defense in depth: proxy.ts already gates /dashboard, but Server Functions
  // aren't covered by proxy matchers, so each protected surface verifies auth itself.
  await auth.protect();

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </div>
  );
}
