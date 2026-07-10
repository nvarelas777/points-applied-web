export interface CardBenefit {
  id: number;
  cardId: number;
  benefitType: string;
  category?: string | null;
  amount?: number | null;
  shortDisplayName?: string | null;
  fullDisplayName: string;
  recurrencePeriod?: string | null;
  resetBasis?: string | null;
  tags?: string[] | null;
  description: string;
}

export interface CardOfferSub {
  id: number;
  cardOfferId: number;
  earningTypeId: number;
  earningTypeName: string;
  earningTypeShortName?: string | null;
  currency: string;
  earningTypeImageUri?: string | null;
  displayName: string;
  minimumSpendAmount?: number | null;
  subPeriod?: number | null;
  subAmount?: number | null;
}

export interface CardOffer {
  id: number;
  cardId: number;
  isActive: boolean;
  endDate?: string | null;
  isFirstYearFeeWaived: boolean;
  cardOfferSubs: CardOfferSub[];
}

/** Full catalog card detail — GET /api/cards/{id}/offer */
export interface Card {
  cardId: number;
  bankId: number;
  earningType: string;
  earningTypeShortName?: string | null;
  earningTypeImageUri?: string | null;
  bankName: string;
  displayBankName: string;
  cardName?: string | null;
  displayCardName: string;
  cardType?: string | null;
  annualFeeAmount?: number | null;
  imageUri?: string | null;
  cardBenefits: CardBenefit[];
  cardOffers: CardOffer[];
}

/** Lightweight catalog list item — GET /api/cards */
export interface BankCard {
  cardId: number;
  bankName: string;
  displayBankName: string;
  cardName: string;
  displayCardName: string;
  cardType: string;
  imageUri?: string | null;
}

export interface BankCardsResponse {
  bankCards: BankCard[];
}

/** Bank-specific sign-up-bonus earning category — GET /api/banks/{bankId}/earning-types */
export interface EarningTypeCategory {
  id: number;
  earningType: string;
  displayName?: string | null;
  displayShortName?: string | null;
  currency: string;
  imageUri?: string | null;
}

export const CUSTOM_BANK_ID = 1;

export const CUSTOM_EARNING_TYPE_CATEGORIES: EarningTypeCategory[] = [
  {
    id: 1,
    earningType: "Cashback",
    currency: "Cashback",
    displayName: "Cash Back",
  },
];
