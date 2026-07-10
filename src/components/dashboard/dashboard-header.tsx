import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-primary px-6 py-4 text-white">
      <Link href="/dashboard" className="font-semibold">
        Points Applied
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/" className="text-white/80 hover:text-white">
          Home
        </Link>
        <UserButton />
      </nav>
    </header>
  );
}
