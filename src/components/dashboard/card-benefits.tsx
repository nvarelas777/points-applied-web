import { BenefitCard } from "@/components/dashboard/benefit-card";
import type { CardBenefit } from "@/types/card";

function BenefitSection({
  title,
  benefits,
  columns = "md:grid-cols-2 lg:grid-cols-3",
  renderExtra,
}: {
  title: string;
  benefits: CardBenefit[];
  columns?: string;
  renderExtra?: (benefit: CardBenefit) => React.ReactNode;
}) {
  if (benefits.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="app-section-subtitle">{title}</h3>
        <span className="text-sm text-slate-500">({benefits.length})</span>
      </div>
      <div className={`grid grid-cols-1 ${columns} gap-3`}>
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} renderExtra={renderExtra} />
        ))}
      </div>
    </div>
  );
}

export function CardBenefits({ cardBenefits }: { cardBenefits: CardBenefit[] }) {
  const statementCredits = cardBenefits
    .filter((b) => b.benefitType === "Credit")
    .sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));
  const spendMultipliers = cardBenefits
    .filter((b) => b.benefitType === "SpendMultiplier")
    .sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));
  const loungeAccess = cardBenefits.filter((b) => b.benefitType === "LoungeAccess");
  const travelProtection = cardBenefits.filter(
    (b) => b.benefitType === "TravelProtection" || b.benefitType === "Travel",
  );
  const status = cardBenefits.filter((b) => b.benefitType === "Status");

  const mainCategories = new Set([
    "Credit",
    "SpendMultiplier",
    "LoungeAccess",
    "TravelProtection",
    "Travel",
    "Status",
  ]);
  const other = cardBenefits.filter((b) => !mainCategories.has(b.benefitType));

  return (
    <div className="space-y-6">
      <BenefitSection
        title="Statement Credits"
        benefits={statementCredits}
        renderExtra={(b) =>
          b.amount ? <div className="pa-metric-sm font-bold">${b.amount}</div> : null
        }
      />
      <BenefitSection
        title="Spend Multipliers"
        benefits={spendMultipliers}
        columns="md:grid-cols-2 lg:grid-cols-4"
        renderExtra={(b) =>
          b.amount ? <div className="pa-metric-sm font-bold mb-2">{b.amount}X</div> : null
        }
      />
      <BenefitSection title="Lounge Access" benefits={loungeAccess} />
      <BenefitSection title="Travel Protection" benefits={travelProtection} />
      <BenefitSection title="Status Benefits" benefits={status} columns="md:grid-cols-2 lg:grid-cols-4" />
      <BenefitSection title="Other Benefits" benefits={other} columns="md:grid-cols-2 lg:grid-cols-4" />
    </div>
  );
}
