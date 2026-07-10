"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { apiFetch } from "@/lib/api";

export async function deleteCardAction(cardId: string): Promise<void> {
  const { userId } = await auth.protect();

  await apiFetch(`/api/users/${userId}/cards/${cardId}`, {
    method: "DELETE",
  });

  revalidatePath("/dashboard");
}
