import Link from "next/link";
import { AuthNav } from "@/components/auth-nav";
import { SiteFooter } from "@/components/site-footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <Link href="/" className="font-semibold">
          Points Applied
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <AuthNav />
        </nav>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
