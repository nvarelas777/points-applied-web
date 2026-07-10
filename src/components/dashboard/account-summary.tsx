import {
  BarChart3,
  Ban,
  CreditCard,
  History,
  PieChart,
  Repeat,
  TrendingUp,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import type { UpcomingCardFee, UserCreditCardResponse } from "@/types/user-card";

export function AccountSummary({ data }: { data: UserCreditCardResponse }) {
  const openPersonal = estimateOpenByType(
    data.personalCardCount,
    data.businessCardCount,
    data.openCardCount,
  );
  const openBusiness = data.openCardCount - openPersonal;

  const totalCredits = data.cards.reduce(
    (total, card) => total + (card.cardCalculations?.totalCreditAmount ?? 0),
    0,
  );

  const nextFee = (data.upcomingCardFees ?? []).reduce<UpcomingCardFee | null>((best, current) => {
    const bestTime = best ? new Date(best.annualFeeDueDate).getTime() : NaN;
    const currentTime = new Date(current.annualFeeDueDate).getTime();
    if (Number.isNaN(currentTime)) return best;
    if (Number.isNaN(bestTime)) return current;
    return currentTime < bestTime ? current : best;
  }, null);

  return (
    <div className="app-card">
      <div className="app-card-header flex items-center gap-4 px-6">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
          <BarChart3 className="text-white size-5" />
        </div>
        <div>
          <h2 className="app-title text-white">Overview</h2>
          <p className="pa-h4 text-slate-300">Key Metrics</p>
        </div>
      </div>

      <div className="app-card-body">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-secondary/10 p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-primary">
                <CreditCard className="size-5" />
              </div>
              <div className="text-right">
                <span className="pa-label">Open Cards</span>
                <div className="pa-metric-md">{data.openCardCount}</div>
              </div>
            </div>
            <div className="flex gap-4 pt-3 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="pa-label">Personal</span>
                <span className="pa-metric-sm">{openPersonal}</span>
              </div>
              <div className="flex flex-col">
                <span className="pa-label">Business</span>
                <span className="pa-metric-sm">{openBusiness}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <TrendingUp className="size-5" />
              </div>
              <div className="text-right">
                <span className="pa-label">Total Annual Fees</span>
                <div className="pa-metric-md">
                  {formatCurrency(data.totalAnnualFees)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="pa-label">Est. Annual Credits</span>
                <span className="pa-metric-sm">
                  + {formatCurrency(totalCredits)}
                </span>
              </div>
              <TrendingUp className="text-emerald-200 size-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <PieChart className="size-5" />
              </div>
              <div className="text-right">
                <span className="pa-label">5/24</span>
                <div
                  className={`pa-metric-md ${data.five24Count >= 4 ? "text-amber-600" : ""}`}
                >
                  {data.five24Count}/24
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-50">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${data.five24Count >= 5 ? "bg-rose-500" : "bg-amber-500"}`}
                  style={{ width: `${(data.five24Count / 5) * 100}%` }}
                />
              </div>
              {data.five24NextFallOffCard && (
                <>
                  <p>
                    <span className="pa-label !inline">Next Falloff: </span>
                    <span className="font-medium !inline">
                      {formatDate(data.five24NextFallOffCard.fallOffDate)}
                    </span>
                  </p>
                  <p className="pa-h4">{data.five24NextFallOffCard.cardName}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <History className="text-slate-400 size-4" />
              <span className="pa-label">Avg Age</span>
            </div>
            <span className="pa-metric-md">
              {data.averageAgeOpenInYears?.toFixed(1) ?? "—"}{" "}
              <span className="text-xs font-medium text-slate-400 ml-1">
                years
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <Repeat className="text-slate-400 size-4" />
              <span className="pa-label">Next Fee</span>
            </div>
            {nextFee ? (
              <>
                <div className="pa-h4">{nextFee.cardName}</div>
                <div className="text-xs font-medium text-slate-400">
                  <span>{formatDate(nextFee.annualFeeDueDate)}</span>
                  <span className="mx-1">•</span>
                  <span>{formatCurrency(nextFee.annualFeeAmount)}</span>
                </div>
              </>
            ) : (
              <div className="pa-metric-md">—</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <Ban className="text-slate-400 size-4" />
              <span className="pa-label">Closed Cards</span>
            </div>
            <span className="pa-metric-md">{data.closedCardCount}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <History className="text-slate-400 size-4" />
              <span className="pa-label">Cards last 12 months</span>
            </div>
            <span className="pa-metric-md">
              {data.cardsOpenLast12MonthsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function estimateOpenByType(
  personalCount: number,
  businessCount: number,
  openCount: number,
): number {
  const total = personalCount + businessCount;
  if (total === 0 || !openCount) return 0;
  return Math.round(openCount * (personalCount / total));
}
