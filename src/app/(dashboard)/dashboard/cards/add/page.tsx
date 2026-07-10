import { notFound } from "next/navigation";
import { CardForm } from "@/components/dashboard/card-form";
import { getAddCardStepTwoData } from "@/app/(dashboard)/dashboard/cards/actions";

export default async function AddCardPage({
  searchParams,
}: {
  searchParams: Promise<{ cardId?: string; isCustom?: string }>;
}) {
  const params = await searchParams;
  const isCustom = params.isCustom === "true";
  const cardId = params.cardId != null ? Number(params.cardId) : null;

  if (!isCustom && (cardId == null || !Number.isFinite(cardId))) {
    notFound();
  }

  const stepTwoData = await getAddCardStepTwoData(cardId, isCustom);

  return (
    <div className="max-w-7xl mx-auto">
      <CardForm
        mode="add"
        cardIsCustom={isCustom}
        display={stepTwoData.card}
        categories={stepTwoData.categories}
        selectedCardId={isCustom ? null : cardId}
        initialValues={{
          annualFeeAmount: stepTwoData.card?.annualFeeAmount ?? 0,
          isFirstYearFeeWaived:
            stepTwoData.card?.cardOffers?.[0]?.isFirstYearFeeWaived ?? false,
        }}
        initialSubs={stepTwoData.initialSubs.map((s) => ({
          earningTypeId: s.earningTypeId,
          earningTypeName: s.earningTypeName,
          subAmount: s.subAmount ?? 0,
          minimumSpendAmount: s.minimumSpendAmount,
          subPeriod: s.subPeriod,
        }))}
        showSubPopulatedDisclaimer={stepTwoData.showSubPopulatedDisclaimer}
      />
    </div>
  );
}
