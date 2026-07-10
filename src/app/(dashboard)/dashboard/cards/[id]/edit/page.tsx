import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CardForm } from "@/components/dashboard/card-form";
import { ApiError } from "@/lib/api";
import { getEarningTypesForBank, getUserCard } from "@/lib/cards";
import { CUSTOM_BANK_ID, CUSTOM_EARNING_TYPE_CATEGORIES } from "@/types/card";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Non-null: (dashboard)/layout.tsx already calls auth.protect() upstream.
  const { userId } = await auth();

  let card;
  try {
    card = await getUserCard(userId!, id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const bankId = card.isCustom ? CUSTOM_BANK_ID : card.bankId;
  const categories = bankId
    ? await getEarningTypesForBank(bankId)
    : CUSTOM_EARNING_TYPE_CATEGORIES;

  return (
    <div className="max-w-7xl mx-auto">
      <CardForm
        mode="edit"
        cardIsCustom={card.isCustom}
        userCardId={card.id}
        display={{
          bankName: card.displayBankName || card.bankName,
          cardName: card.displayCardName || card.cardName,
          cardType: card.cardType,
          earningType: card.earningType,
          imageUri: card.imageUri,
          cardBenefits: card.cardBenefits,
        }}
        categories={categories.length ? categories : CUSTOM_EARNING_TYPE_CATEGORIES}
        initialValues={{
          bankName: card.bankName,
          cardName: card.cardName,
          cardType: card.cardType,
          annualFeeAmount: card.annualFeeAmount,
          isFirstYearFeeWaived: card.isFirstYearFeeWaived,
          isOpen: card.isOpen,
          approvalDate: card.approvalDate ?? undefined,
          closedDate: card.closedDate,
          userNote: card.userNote ?? "",
        }}
        initialSubs={card.userCardSubs.map((sub) => ({
          earningTypeId: sub.earningTypeId,
          earningTypeName: sub.earningTypeName,
          subAmount: sub.subAmount ?? 0,
          minimumSpendAmount: sub.minimumSpendAmount ?? null,
          subPeriod: sub.subPeriod ?? null,
        }))}
      />
    </div>
  );
}
