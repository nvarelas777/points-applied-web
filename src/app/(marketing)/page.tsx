import Link from "next/link";
import { SignInCta } from "@/components/marketing/sign-in-cta";

interface MockCard {
  name: string;
  bank: string;
  fee: number;
  status: string;
  statusClass: string;
  color: string;
}

const MOCK_CARDS: MockCard[] = [
  {
    name: "Sapphire Reserve",
    bank: "Chase",
    fee: 550,
    status: "Active",
    statusClass: "bg-[var(--pa-success-bg)] text-[var(--pa-success)]",
    color: "from-slate-700 to-slate-900",
  },
  {
    name: "Platinum Card",
    bank: "American Express",
    fee: 695,
    status: "Active",
    statusClass: "bg-[var(--pa-success-bg)] text-[var(--pa-success)]",
    color: "from-slate-400 to-slate-600",
  },
  {
    name: "Venture X",
    bank: "Capital One",
    fee: 395,
    status: "Active",
    statusClass: "bg-[var(--pa-success-bg)] text-[var(--pa-success)]",
    color: "from-blue-400 to-blue-700",
  },
  {
    name: "Freedom Unlimited",
    bank: "Chase",
    fee: 0,
    status: "No Fee",
    statusClass: "bg-[var(--pa-sky-wash)] text-[var(--pa-navy)]",
    color: "from-sky-400 to-sky-600",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 pb-10 md:pt-16 md:pb-16 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-slate-100 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/40 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
            {/* Left: copy */}
            <div className="flex-1 text-center lg:text-left z-10 w-full max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.08] md:leading-[1.05] mb-4 pb-1">
                From Card Chaos
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
                  To Decision Clarity.
                </span>
              </h1>
              <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-8">
                Build a clean system for open cards, earned bonuses, and
                annual fee exposure. Stop guessing your next move and start
                making strategy decisions from one reliable source.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <SignInCta className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white text-base font-black shadow-xl hover:bg-primary/90 transition-all active:scale-95">
                  Build My Card System
                </SignInCta>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-secondary text-primary text-base font-black shadow-sm hover:bg-secondary/80 transition-all active:scale-95"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Right: dashboard mockup */}
            <div className="flex-[1.2] w-full max-w-[680px] mx-auto lg:mx-0">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 via-accent/10 to-transparent blur-3xl -z-10 rounded-3xl transform group-hover:scale-105 transition-transform duration-700" />
                <div className="bg-white border border-slate-200/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden">
                  {/* Mock browser chrome */}
                  <div className="bg-slate-100/80 border-b border-slate-200/50 px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-secondary/80" />
                    <div className="mx-auto bg-white/60 border border-slate-200/50 rounded-md px-16 py-1.5">
                      <span className="text-[10px] text-slate-400 font-medium">
                        app.pointsapplied.com
                      </span>
                    </div>
                  </div>

                  {/* Mock dashboard */}
                  <div className="bg-[var(--pa-bg)] p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3 border border-[var(--pa-border)] shadow-sm">
                        <div className="pa-label mb-1">Open Cards</div>
                        <div className="pa-metric-lg">7</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-[var(--pa-border)] shadow-sm">
                        <div className="pa-label mb-1">5/24 Status</div>
                        <div className="pa-metric-lg text-[var(--pa-success)]">3/5</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-[var(--pa-border)] shadow-sm">
                        <div className="pa-label mb-1">Annual Fees</div>
                        <div className="pa-metric-lg">$1,795</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-[var(--pa-border)] shadow-sm overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-[var(--pa-border)] flex items-center justify-between">
                        <span className="pa-label">My Cards</span>
                        <span className="text-[10px] text-[var(--pa-text-3)]">
                          7 active
                        </span>
                      </div>
                      {MOCK_CARDS.map((card) => (
                        <div
                          key={card.name}
                          className="px-4 py-3 flex items-center gap-4 border-b border-[var(--pa-border)] last:border-0"
                        >
                          <div
                            className={`w-8 h-5 rounded bg-gradient-to-br shrink-0 ${card.color}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[var(--pa-text)] truncate">
                              {card.name}
                            </div>
                            <div className="text-[11px] text-[var(--pa-text-3)]">
                              {card.bank}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold text-[var(--pa-text)]">
                              ${card.fee}/yr
                            </div>
                            <div
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${card.statusClass}`}
                            >
                              {card.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 md:py-10 bg-secondary border-y">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-700 bg-primary p-4">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                Privacy Model
              </div>
              <div className="text-2xl font-black text-white">
                No Linked Banks
              </div>
              <div className="text-sm text-slate-300 mt-1">
                No Plaid. No credential exposure risk.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-primary p-4">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                Inventory Depth
              </div>
              <div className="text-2xl font-black text-white">
                Open + Closed
              </div>
              <div className="text-sm text-slate-300 mt-1">
                Track your full history in one ledger.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-primary p-4">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                Fee Awareness
              </div>
              <div className="text-2xl font-black text-white">
                Renewal Forecast
              </div>
              <div className="text-sm text-slate-300 mt-1">
                Prepare for annual fee decisions earlier.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-primary p-4">
              <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                Bonus Visibility
              </div>
              <div className="text-2xl font-black text-white">
                Lifetime SUBs
              </div>
              <div className="text-sm text-slate-300 mt-1">
                Know cumulative value by card and issuer.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-primary rounded-[36px] p-10 md:p-14 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-slate-700/50 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-600/30 rounded-full blur-[100px]" />
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight max-w-3xl mx-auto relative">
              Build the portfolio system your strategy deserves.
            </h2>
            <p className="text-slate-300 text-lg mb-9 max-w-2xl mx-auto relative">
              Replace scattered notes and fragile spreadsheets with a
              data-focused operating layer for rewards decisions.
            </p>
            <SignInCta className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-white text-base font-black shadow-xl hover:bg-accent/90 transition-all active:scale-95 relative">
              Start My Dashboard
            </SignInCta>
          </div>
        </div>
      </section>
    </>
  );
}
