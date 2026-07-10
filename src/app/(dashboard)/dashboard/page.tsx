import { auth } from "@clerk/nextjs/server";
import { AccountSummary } from "@/components/dashboard/account-summary";
import { CardList } from "@/components/dashboard/card-list";
import { ensureUser, getBankCards, getUserCards } from "@/lib/cards";

export default async function DashboardPage() {
  // Non-null: (dashboard)/layout.tsx already calls auth.protect() upstream.
  const { userId } = await auth();

  await ensureUser(userId!);
  const [cardData, bankCards] = await Promise.all([
    getUserCards(userId!),
    getBankCards(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <AccountSummary data={cardData} />
      <CardList cards={cardData.cards} bankCards={bankCards} />
    </div>
  );
}
