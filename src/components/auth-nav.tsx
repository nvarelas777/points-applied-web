"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

// Client-side island so (marketing) pages stay statically prerenderable —
// server-side auth checks (e.g. <Show/>) force the whole route dynamic.
export function AuthNav() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <>
        <Link href="/dashboard">Dashboard</Link>
        <UserButton />
      </>
    );
  }

  return <SignInButton mode="modal" />;
}
