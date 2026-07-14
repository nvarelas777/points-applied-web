"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardDetailDialog } from "@/components/dashboard/card-detail-dialog";
import { formatCurrency, formatDate } from "@/lib/format";
import type { UserCreditCard } from "@/types/user-card";
import { deleteCardAction } from "@/app/(dashboard)/dashboard/actions";

export function CardRow({ card }: { card: UserCreditCard }) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteCardAction(String(card.id));
      setDeleteOpen(false);
    });
  };

  return (
    <>
      <div
        className="group relative bg-white border border-slate-100 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:border-indigo-100 cursor-pointer"
        onClick={() => setDetailOpen(true)}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="md:col-span-4 flex items-center gap-4 min-w-0">
            <div className="h-14 w-24 flex-shrink-0 bg-slate-50 rounded-lg border border-slate-100 p-1 flex items-center justify-center">
              <Image
                src={card.imageUri || "/logo/pa-cartoon-card-placeholder.png"}
                alt="Card artwork"
                width={96}
                height={56}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="app-kicker">
                {card.displayBankName || card.bankName}
              </span>
              <span className="pa-h4 truncate">
                {card.displayCardName || card.cardName}
              </span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex flex-col">
              <span className="pa-label">Type</span>
              <span className="pa-h4">{card.cardType}</span>
            </div>
            <div className="flex flex-col">
              <span className="pa-label">Opened</span>
              <span className="pa-h4">{formatDate(card.approvalDate)}</span>
            </div>
            <div className="flex flex-col">
              <span className="pa-label">Annual Fee</span>
              <span
                className={`pa-h4 ${!card.annualFeeAmount ? "text-slate-400" : ""}`}
              >
                {card.annualFeeAmount ? formatCurrency(card.annualFeeAmount) : "—"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="pa-label">Status</span>
              <span
                className={`inline-flex w-fit items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                  card.isOpen
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {card.isOpen ? "Active" : "Closed"}
              </span>
            </div>
          </div>

          <div
            className="md:col-span-1 flex justify-end gap-1 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/dashboard/cards/${card.id}/edit`}
              className="inline-flex items-center justify-center size-8 rounded-md text-amber-500 hover:text-amber-600 hover:bg-amber-50"
            >
              <Pencil className="size-4" />
            </Link>
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogTrigger className="inline-flex items-center justify-center size-8 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="size-4" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete card</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete{" "}
                    {card.displayCardName || card.cardName}? This can&apos;t be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
                    {isDeleting ? "Deleting…" : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <CardDetailDialog card={card} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}
