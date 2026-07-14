"use client";

import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";

// Small client island (same pattern as SiteHeader) so the rest of the
// marketing page stays a static Server Component. Signed-in visitors go
// straight to the dashboard instead of seeing the sign-in modal again.
export function SignInCta({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
      <Link href="/dashboard" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
      <button type="button" className={className}>
        {children}
      </button>
    </SignInButton>
  );
}
