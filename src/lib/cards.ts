import { apiFetch } from "@/lib/api";
import type {
  AddUserCardRequest,
  UserCreditCard,
  UserCreditCardResponse,
} from "@/types/user-card";
import type { BankCard, BankCardsResponse, Card, EarningTypeCategory } from "@/types/card";

/**
 * Lazily creates the app-side user record on first load, mirroring
 * nick-app's UserService.ensureUserExists(). Must run before fetching a
 * user's cards for a Clerk user who may not exist in the DB yet.
 */
export async function ensureUser(userId: string): Promise<void> {
  await apiFetch(`/api/users/${userId}/ensure`, { method: "POST" });
}

export async function getUserCards(
  userId: string,
): Promise<UserCreditCardResponse> {
  return apiFetch<UserCreditCardResponse>(`/api/users/${userId}/cards`);
}

export async function getUserCard(
  userId: string,
  cardId: string,
): Promise<UserCreditCard> {
  return apiFetch<UserCreditCard>(`/api/users/${userId}/cards/${cardId}`);
}

/** Full card catalog, used to populate the "Add card" search/browse list. */
export async function getBankCards(): Promise<BankCard[]> {
  const res = await apiFetch<BankCardsResponse>("/api/cards");
  return res.bankCards;
}

/** Full offer detail (sub-offers, benefits) for a single catalog card. */
export async function getCardOffer(cardId: number): Promise<Card> {
  return apiFetch<Card>(`/api/cards/${cardId}/offer`);
}

/** Bank-specific sign-up-bonus earning categories, for the SUB form's dropdown. */
export async function getEarningTypesForBank(
  bankId: number,
): Promise<EarningTypeCategory[]> {
  return apiFetch<EarningTypeCategory[]>(`/api/banks/${bankId}/earning-types`);
}

export async function addUserCard(
  userId: string,
  payload: AddUserCardRequest,
): Promise<{ id: string }> {
  return apiFetch<{ id: string }>(`/api/users/${userId}/cards`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateUserCard(
  userId: string,
  cardId: string,
  payload: AddUserCardRequest,
): Promise<void> {
  await apiFetch(`/api/users/${userId}/cards/${cardId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
