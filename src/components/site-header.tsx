"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

// Client component (like the auth-nav it replaces) so it can read auth
// state — the (marketing) pages themselves stay static Server Components.
export function SiteHeader() {
  const { isLoaded, isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-secondary">
      <div className="max-w-7xl mx-auto px-3 md:px-6 flex items-center justify-between relative h-16 md:h-20">
        <Link
          href={isSignedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
          onClick={closeMobileMenu}
        >
          <Image
            src="/logo/logo.png"
            alt="Points Applied"
            width={1217}
            height={327}
            priority
            className="h-11 md:h-14 w-auto group-hover:scale-[1.02] transition-transform"
          />
          <span className="sr-only">Points Applied</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            {isSignedIn && (
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-primary hover:text-white transition-colors"
                >
                  My Cards
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/faq"
                className="text-sm font-semibold text-primary hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <UserButton />
                ) : (
                  <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                    <button
                      type="button"
                      className="bg-primary text-accent px-5 py-2.5 rounded-full text-sm font-black shadow-lg hover:bg-primary/90 transition-all active:scale-95"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="md:hidden text-primary"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {mobileOpen && (
          <div className="md:hidden absolute top-full right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg p-2 z-50">
            <div className="flex flex-col">
              {isSignedIn && (
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-slate-50"
                  onClick={closeMobileMenu}
                >
                  My Cards
                </Link>
              )}

              <Link
                href="/faq"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-slate-50"
                onClick={closeMobileMenu}
              >
                FAQ
              </Link>

              <div className="my-1 border-t border-slate-100" />

              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <div className="px-3 py-2">
                      <UserButton />
                    </div>
                  ) : (
                    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                      <button
                        type="button"
                        onClick={closeMobileMenu}
                        className="mt-1 w-full text-left px-3 py-2 rounded-lg text-sm font-black bg-primary text-accent hover:bg-primary/90"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
