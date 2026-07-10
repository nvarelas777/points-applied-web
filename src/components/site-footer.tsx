import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-primary/15 bg-secondary py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link
            href="/faq"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy-policy"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-use"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            Terms
          </Link>
        </div>
        <p className="text-sm font-medium text-primary/70">
          &copy; {currentYear} Points Applied. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
