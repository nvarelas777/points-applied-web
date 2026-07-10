"use client";

import { useRouter } from "next/navigation";
import { CardCatalogPicker, type CardSelection } from "@/components/dashboard/card-catalog-picker";
import type { BankCard } from "@/types/card";

/** Dialog-only step 1: pick a card, then navigate to the add-card page for step 2. */
export function AddCardFlow({
  bankCards,
  onCancel,
}: {
  bankCards: BankCard[];
  onCancel?: () => void;
}) {
  const router = useRouter();

  const handleContinue = (selection: CardSelection) => {
    const query = selection.isCustom
      ? "isCustom=true"
      : `cardId=${selection.cardId}`;
    router.push(`/dashboard/cards/add?${query}`);
  };

  return (
    <CardCatalogPicker
      bankCards={bankCards}
      onContinue={handleContinue}
      onCancel={onCancel}
    />
  );
}
