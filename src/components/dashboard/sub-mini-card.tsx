import { Gift, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export function SubMiniCard({
  subAmount,
  minimumSpendAmount,
  subPeriod,
  earningTypeName,
  currency,
  isEditable,
  onEdit,
  onDelete,
}: {
  subAmount: number;
  minimumSpendAmount?: number | null;
  subPeriod?: number | null;
  earningTypeName?: string;
  currency?: string;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const isUponApproval = subPeriod == null || minimumSpendAmount == null;

  const formattedAmount = (() => {
    if (!subAmount) return "0";
    const amount = subAmount.toLocaleString();
    if (currency?.toLowerCase() === "cashback") return `$${amount}`;
    if (currency) return `${amount} ${currency}`;
    return amount;
  })();

  return (
    <div className="bg-white px-3.5 py-3 rounded-xl border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Gift className="size-4 text-slate-400" />
          <span className="text-sm font-medium">
            {earningTypeName || "Welcome Bonus"}
          </span>
        </div>
        {isEditable && (
          <div className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon-sm" onClick={onEdit}>
              <Pencil className="size-4 text-amber-500" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={onDelete}>
              <Trash2 className="size-4 text-red-400" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <div className="pa-metric-sm">{formattedAmount}</div>
        <div className="text-sm font-medium text-slate-500">
          {isUponApproval ? (
            <span>Upon Approval</span>
          ) : (
            <span>
              Spend{" "}
              {(minimumSpendAmount ?? 0) >= 1000
                ? `$${Math.round((minimumSpendAmount ?? 0) / 1000)}k`
                : formatCurrency(minimumSpendAmount)}{" "}
              / {subPeriod} mo
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
