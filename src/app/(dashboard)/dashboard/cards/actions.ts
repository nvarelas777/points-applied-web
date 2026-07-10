"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import {
  addUserCard,
  getCardOffer,
  getEarningTypesForBank,
  updateUserCard,
} from "@/lib/cards";
import {
  CUSTOM_BANK_ID,
  CUSTOM_EARNING_TYPE_CATEGORIES,
  type Card,
  type EarningTypeCategory,
} from "@/types/card";
import type { AddUserCardRequest } from "@/types/user-card";

export interface AddCardStepTwoData {
  card: Card | null;
  initialSubs: {
    earningTypeId: number;
    earningTypeName: string;
    subAmount: number | null;
    minimumSpendAmount: number | null;
    subPeriod: number | null;
  }[];
  categories: EarningTypeCategory[];
  showSubPopulatedDisclaimer: boolean;
}

/** Fetches the catalog offer + bank-specific earning categories for step 2 of Add Card. */
export async function getAddCardStepTwoData(
  cardId: number | null,
  isCustom: boolean,
): Promise<AddCardStepTwoData> {
  await auth.protect();

  if (isCustom) {
    const categories = await getEarningTypesForBank(CUSTOM_BANK_ID);
    return {
      card: null,
      initialSubs: [],
      categories: categories.length ? categories : CUSTOM_EARNING_TYPE_CATEGORIES,
      showSubPopulatedDisclaimer: false,
    };
  }

  if (cardId == null) {
    throw new Error("cardId is required for non-custom cards");
  }

  const card = await getCardOffer(cardId);
  const categories = await getEarningTypesForBank(card.bankId);
  const offerSubs = card.cardOffers.flatMap((offer) => offer.cardOfferSubs);

  return {
    card,
    initialSubs: offerSubs.map((sub) => ({
      earningTypeId: sub.earningTypeId,
      earningTypeName: sub.earningTypeName,
      subAmount: sub.subAmount ?? 0,
      minimumSpendAmount: sub.minimumSpendAmount ?? null,
      subPeriod: sub.subPeriod ?? null,
    })),
    categories: categories.length ? categories : CUSTOM_EARNING_TYPE_CATEGORIES,
    showSubPopulatedDisclaimer: offerSubs.length > 0,
  };
}

export async function addCardAction(payload: AddUserCardRequest) {
  const { userId } = await auth.protect();

  await addUserCard(userId, payload);
  revalidatePath("/dashboard");
}

export async function updateCardAction(
  userCardId: string,
  payload: AddUserCardRequest,
) {
  const { userId } = await auth.protect();

  await updateUserCard(userId, userCardId, payload);
  revalidatePath("/dashboard");
}
