import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardBenefits } from "@/components/dashboard/card-benefits";
import { SectionTitle } from "@/components/dashboard/section-title";
import { SubMiniCard } from "@/components/dashboard/sub-mini-card";
import { getBankIconPath } from "@/lib/bank-icon";
import { formatCurrency, formatDate } from "@/lib/format";
import type { UserCreditCard } from "@/types/user-card";

function accountAge(card: UserCreditCard): string {
  if (!card.approvalDate) return "—";
  const start = new Date(card.approvalDate);
  const end = card.isOpen ? new Date() : new Date(card.closedDate || Date.now());
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(Math.max(0, totalMonths) / 12);
  const months = Math.max(0, totalMonths) % 12;
  if (years === 0) return `${months}m`;
  return months === 0 ? `${years}y` : `${years}y ${months}m`;
}

export function CardDetailDialog({
  card,
  open,
  onOpenChange,
}: {
  card: UserCreditCard;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0"
        initialFocus={false}
      >
        <div className="flex flex-col">
          <div className="flex items-start gap-4 p-4">
            <div className="h-16 w-16 flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getBankIconPath(card.bankName)}
                alt={`${card.bankName} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="pa-h4">{card.displayBankName || card.bankName}</div>
              <h3 className="text-lg font-semibold">
                {card.displayCardName || card.cardName}
              </h3>
            </div>
          </div>

          <div className="px-4 sm:px-6 space-y-6 pb-2">
            <section className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <SectionTitle>Card Information</SectionTitle>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="max-w-32 mx-auto sm:max-w-none sm:mx-0 relative h-32 sm:w-48 sm:shrink-0 rounded-xl border border-slate-100 shadow-sm overflow-hidden bg-white">
                  {card.imageUri && (
                    <Image
                      src={card.imageUri}
                      alt="Card artwork"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <span className="block pa-label mb-1.5">Type</span>
                    <span className="pa-body">{card.cardType}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <span className="block pa-label mb-1.5">Annual Fee</span>
                    <span className="pa-body">
                      {card.annualFeeAmount ? formatCurrency(card.annualFeeAmount) : "—"}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100 col-span-2">
                    <span className="block pa-label mb-1.5">Earning Type</span>
                    <span className="pa-body">{card.earningType || "—"}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <span className="block pa-label mb-1.5">Status</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        card.isOpen
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      {card.isOpen ? "Active" : "Closed"}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <span className="block pa-label mb-1.5">Active Length</span>
                    <span className="pa-body">{accountAge(card)}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-100">
                    <span className="block pa-label mb-1.5">Open Date</span>
                    <span className="pa-body">{formatDate(card.approvalDate)}</span>
                  </div>
                  {!card.isOpen && card.closedDate && (
                    <div className="p-3 rounded-lg bg-white border border-slate-100">
                      <span className="block pa-label mb-1.5">Close Date</span>
                      <span className="pa-body">{formatDate(card.closedDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {card.userCardSubs.length > 0 && (
                <div className="pt-1">
                  <span className="pa-label block mb-2">Sign-up Bonus</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {card.userCardSubs.map((sub, i) => (
                      <SubMiniCard
                        key={sub.id ?? i}
                        subAmount={sub.subAmount ?? 0}
                        minimumSpendAmount={sub.minimumSpendAmount}
                        subPeriod={sub.subPeriod}
                        earningTypeName={sub.earningTypeName}
                        currency={sub.currency}
                      />
                    ))}
                  </div>
                </div>
              )}

              {card.userNote && (
                <div className="pt-3 border-t border-slate-200">
                  <span className="pa-label block mb-2">My Notes</span>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {card.userNote}
                  </p>
                </div>
              )}
            </section>

            {card.cardBenefits.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <SectionTitle className="mb-3">Included Benefits</SectionTitle>
                <CardBenefits cardBenefits={card.cardBenefits} />
              </div>
            )}
          </div>

          <div className="flex justify-end p-6 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
