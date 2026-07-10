import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Points Applied",
  description:
    "Points Applied is a tool for managing your credit card portfolio clearly — which cards you hold, sign-up bonuses earned, and benefits coming up.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <p className="pa-label mb-3">About</p>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
        Built for people who take points seriously.
      </h1>

      <div className="space-y-5 text-lg text-slate-600 leading-relaxed mb-12">
        <p>
          Premium credit cards are genuinely complex. Sign-up bonus
          eligibility rules vary by issuer, benefits expire on fixed
          schedules, and annual fee decisions require knowing your full
          portfolio history — not just the card in your hand.
        </p>
        <p>
          Most people track this in a spreadsheet. It works until it
          doesn&apos;t — missed credits, forgotten cooldown windows,
          applications that get denied because of rules you didn&apos;t know
          applied.
        </p>
        <p>
          <strong className="text-slate-800">Points Applied</strong> is a
          tool for managing your card portfolio clearly: which cards you
          hold, when you opened them, what bonuses you&apos;ve earned, and
          what benefits are coming up. No linked bank accounts, no
          credential exposure — you enter what you know, and the app keeps
          it organized.
        </p>
      </div>

      <div className="bg-primary rounded-[32px] p-8 md:p-10 text-center relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-slate-700/50 rounded-full blur-[80px]" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-slate-600/30 rounded-full blur-[80px]" />
        <h2 className="text-2xl font-black text-white mb-3 relative">
          Try Points Applied
        </h2>
        <p className="text-slate-300 mb-6 relative">
          Track your cards, bonuses, and benefits in one place.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white font-black shadow-lg hover:bg-accent/90 transition-all active:scale-95 relative"
        >
          Build My Card System
        </Link>
      </div>
    </main>
  );
}
