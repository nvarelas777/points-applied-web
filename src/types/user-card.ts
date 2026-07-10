import type { CardBenefit } from "./card";

export interface UserCardSub {
  id?: string | null;
  earningTypeId: number;
  earningTypeName: string;
  earningTypeShortName?: string | null;
  currency: string;
  earningTypeImageUri?: string | null;
  subAmount?: number | null;
  subPeriod?: number | null;
  minimumSpendAmount?: number | null;
}

export interface CardCalculations {
  totalCreditAmount: number;
}

export interface UserCardCalculations {
  sameCardTotalCount: number;
  sameCardNumber: number;
  overallCardNumber: number;
  cardTypeNumber: number;
}

/** A user's saved card row — GET /api/users/{userId}/cards[/{id}] */
export interface UserCreditCard {
  id: string;
  userUniqueId: string;
  cardId: number | null;
  bankId: number | null;
  bankName: string;
  displayBankName: string;
  cardName: string;
  displayCardName: string;
  cardType: string;
  earningType: string;
  earningTypeShortName?: string | null;
  earningTypeImageUri?: string | null;
  imageUri?: string | null;
  isCustom: boolean;
  annualFeeAmount: number;
  isFirstYearFeeWaived: boolean;
  approvalDate: string | null;
  isOpen: boolean;
  closedDate: string | null;
  userNote?: string | null;
  createdDate: string;
  deletedDate: string | null;
  cardBenefits: CardBenefit[];
  userCardSubs: UserCardSub[];
  cardCalculations: CardCalculations;
  userCardCalculations: UserCardCalculations;
}

export interface UpcomingCardFee {
  cardName: string;
  bankName: string;
  annualFeeAmount: number;
  approvalDate: string;
  annualFeeDueDate: string;
}

export interface Five24NextFallOffCard {
  bankName: string;
  cardName: string;
  fallOffDate: string;
}

export interface UserCreditCardResponse {
  openCardCount: number;
  closedCardCount: number;
  five24Count: number;
  personalCardCount: number;
  businessCardCount: number;
  cardsOpenLast12MonthsCount: number;
  averageAgeOpenInYears: number;
  totalAnnualFees: number;
  five24NextFallOffCard?: Five24NextFallOffCard | null;
  upcomingCardFees?: UpcomingCardFee[] | null;
  cards: UserCreditCard[];
}

/** Request body for POST/PUT /api/users/{userId}/cards[/{id}] */
export interface AddUserCardRequest {
  cardId: number | null;
  isCustom: boolean;
  annualFeeAmount: number;
  isFirstYearFeeWaived: boolean;
  approvalDate: string | null;
  closedDate: string | null;
  isOpen: boolean;
  userCardSubs: {
    earningTypeId: number;
    subAmount: number | null;
    subPeriod: number | null;
    minimumSpendAmount: number | null;
  }[];
  bankName?: string;
  cardName?: string;
  cardType?: string;
  earningType?: string;
  userNote?: string;
}
