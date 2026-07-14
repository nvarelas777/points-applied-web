"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Briefcase, Gift, Info, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardBenefits } from "@/components/dashboard/card-benefits";
import { SectionTitle } from "@/components/dashboard/section-title";
import { SubDialog, type SubResult } from "@/components/dashboard/sub-dialog";
import { SubMiniCard } from "@/components/dashboard/sub-mini-card";
import type { EarningTypeCategory } from "@/types/card";
import type { AddUserCardRequest } from "@/types/user-card";
import {
  addCardAction,
  updateCardAction,
} from "@/app/(dashboard)/dashboard/cards/actions";

const cardFormSchema = z
  .object({
    bankName: z.string().optional(),
    cardName: z.string().optional(),
    cardType: z.string().optional(),
    annualFeeAmount: z.number().min(0, "Must be 0 or greater"),
    isFirstYearFeeWaived: z.boolean(),
    isOpen: z.boolean(),
    approvalDate: z.string().min(1, "Required"),
    closedDate: z.string().nullable(),
    userNote: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isOpen) {
      if (!data.closedDate) {
        ctx.addIssue({
          path: ["closedDate"],
          code: "custom",
          message: "Required",
        });
      } else if (new Date(data.approvalDate) > new Date(data.closedDate)) {
        ctx.addIssue({
          path: ["closedDate"],
          code: "custom",
          message: "Closed date must be after approval date",
        });
      }
    }
  });

type CardFormValues = z.infer<typeof cardFormSchema>;

export interface CardFormDisplay {
  bankName?: string | null;
  cardName?: string | null;
  cardType?: string | null;
  earningType?: string | null;
  imageUri?: string | null;
  cardBenefits?: { id: number; cardId: number; benefitType: string; category?: string | null; amount?: number | null; shortDisplayName?: string | null; fullDisplayName: string; recurrencePeriod?: string | null; resetBasis?: string | null; tags?: string[] | null; description: string }[];
}

export function CardForm({
  mode,
  cardIsCustom,
  display,
  categories,
  userCardId,
  selectedCardId,
  initialValues,
  initialSubs,
  showSubPopulatedDisclaimer: initialShowDisclaimer,
  onSuccess,
  onCancel,
}: {
  mode: "add" | "edit";
  cardIsCustom: boolean;
  display: CardFormDisplay | null;
  categories: EarningTypeCategory[];
  userCardId?: string;
  selectedCardId?: number | null;
  initialValues?: Partial<CardFormValues>;
  initialSubs: SubResult[];
  showSubPopulatedDisclaimer?: boolean;
  /** Defaults to navigating to /dashboard (the edit-page usage). */
  onSuccess?: () => void;
  /** Defaults to navigating to /dashboard (the edit-page usage). */
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [subs, setSubs] = useState<SubResult[]>(initialSubs);
  const [showDisclaimer, setShowDisclaimer] = useState(!!initialShowDisclaimer);
  const [subDialogOpen, setSubDialogOpen] = useState(false);
  const [editingSubIndex, setEditingSubIndex] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      bankName: initialValues?.bankName ?? "",
      cardName: initialValues?.cardName ?? "",
      cardType: initialValues?.cardType ?? "",
      annualFeeAmount: initialValues?.annualFeeAmount ?? 0,
      isFirstYearFeeWaived: initialValues?.isFirstYearFeeWaived ?? false,
      isOpen: initialValues?.isOpen ?? true,
      approvalDate:
        initialValues?.approvalDate ?? new Date().toISOString().slice(0, 10),
      closedDate: initialValues?.closedDate ?? null,
      userNote: initialValues?.userNote ?? "",
    },
  });

  const isOpen = form.watch("isOpen");
  const annualFeeAmount = form.watch("annualFeeAmount");

  const onSubmit = (values: CardFormValues) => {
    setSubmitError(null);

    const payload: AddUserCardRequest = {
      cardId: cardIsCustom ? null : (selectedCardId ?? null),
      isCustom: cardIsCustom,
      annualFeeAmount: values.annualFeeAmount,
      isFirstYearFeeWaived: values.isFirstYearFeeWaived,
      approvalDate: values.approvalDate,
      closedDate: values.isOpen ? null : values.closedDate,
      isOpen: values.isOpen,
      userCardSubs: subs.map((s) => ({
        earningTypeId: s.earningTypeId,
        subAmount: s.subAmount,
        subPeriod: s.subPeriod,
        minimumSpendAmount: s.minimumSpendAmount,
      })),
      userNote: values.userNote || undefined,
      ...(cardIsCustom
        ? {
            bankName: values.bankName,
            cardName: values.cardName,
            cardType: values.cardType,
            earningType: "Cashback",
          }
        : {}),
    };

    startTransition(async () => {
      try {
        if (mode === "edit" && userCardId) {
          await updateCardAction(userCardId, payload);
        } else {
          await addCardAction(payload);
        }
        if (onSuccess) onSuccess();
        else router.push("/dashboard");
      } catch {
        setSubmitError("Something went wrong saving this card. Please try again.");
      }
    });
  };

  const openAddSub = () => {
    setEditingSubIndex(null);
    setSubDialogOpen(true);
  };

  const openEditSub = (index: number) => {
    setEditingSubIndex(index);
    setSubDialogOpen(true);
  };

  const handleSubSave = (result: SubResult) => {
    setSubs((prev) => {
      if (editingSubIndex != null) {
        const next = [...prev];
        next[editingSubIndex] = result;
        return next;
      }
      return [...prev, result];
    });
  };

  const removeSub = (index: number) => {
    setSubs((prev) => prev.filter((_, i) => i !== index));
  };

  const displayBankName = display?.bankName || form.watch("bankName");
  const displayCardName = display?.cardName || form.watch("cardName");
  const displayCardType = display?.cardType || form.watch("cardType");

  return (
    <div className="app-card">
      <div className="app-card-header flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
          <Gift className="text-white size-5" />
        </div>
        <div>
          <h1 className="app-title text-white">
            {mode === "edit" ? "Edit Card" : "Add New Card"}
          </h1>
          <p className="pa-h4 text-slate-300">
            Manage your card details, benefits, and sign-up bonuses
          </p>
        </div>
      </div>

      <div className="app-card-body space-y-6">
        {showDisclaimer && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="text-amber-500 size-5 shrink-0" />
              <span className="text-amber-900 font-medium text-sm">
                The following fields are auto-populated with the current
                public offer. You may clear them if you wish.
              </span>
            </div>
            <div className="flex gap-2 self-end md:self-auto shrink-0">
              <Button variant="ghost" onClick={() => setShowDisclaimer(false)}>
                Keep
              </Button>
              <Button
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={() => {
                  setSubs([]);
                  setShowDisclaimer(false);
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Card Information */}
          <section className="bg-slate-50 rounded-2xl p-4 space-y-4">
            <SectionTitle>Card Information</SectionTitle>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex justify-center">
                <div className="h-[150px] w-[240px] relative">
                  {display?.imageUri && (
                    <Image
                      src={display.imageUri}
                      alt="Card artwork"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                {cardIsCustom ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Bank Name</Label>
                      <Input {...form.register("bankName")} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Card Name</Label>
                      <Input {...form.register("cardName")} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Card Type</Label>
                      <Select
                        value={form.watch("cardType") || undefined}
                        onValueChange={(value) =>
                          value && form.setValue("cardType", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal">
                            <User className="size-4" /> Personal
                          </SelectItem>
                          <SelectItem value="Business">
                            <Briefcase className="size-4" /> Business
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="pa-label mb-1">Bank Name</div>
                      <div className="pa-h4">{displayBankName || "N/A"}</div>
                    </div>
                    <div>
                      <div className="pa-label mb-1">Card Name</div>
                      <div className="pa-h4">{displayCardName || "N/A"}</div>
                    </div>
                    <div>
                      <div className="pa-label mb-1">Card Type</div>
                      <div className="pa-h4">{displayCardType || "N/A"}</div>
                    </div>
                    <div>
                      <div className="pa-label mb-1">Earning Type</div>
                      <div className="pa-h4">{display?.earningType || "N/A"}</div>
                    </div>
                  </div>
                )}

                <div className="pt-3 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label>Annual Fee Amount</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...form.register("annualFeeAmount", { valueAsNumber: true })}
                    />
                    {form.formState.errors.annualFeeAmount && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.annualFeeAmount.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>Card Status</Label>
                    <div className="bg-slate-100 p-1 rounded-lg flex border border-slate-200 h-9">
                      <button
                        type="button"
                        className={`flex-1 rounded-md text-sm font-bold transition-all ${isOpen ? "bg-white shadow-sm text-primary" : "text-slate-500"}`}
                        onClick={() => {
                          form.setValue("isOpen", true);
                          form.setValue("closedDate", null);
                        }}
                      >
                        Open
                      </button>
                      <button
                        type="button"
                        className={`flex-1 rounded-md text-sm font-bold transition-all ${!isOpen ? "bg-white shadow-sm text-red-600" : "text-slate-500"}`}
                        onClick={() => {
                          form.setValue("isOpen", false);
                          if (!form.getValues("closedDate")) {
                            form.setValue(
                              "closedDate",
                              new Date().toISOString().slice(0, 10),
                            );
                          }
                        }}
                      >
                        Closed
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>Approval Date</Label>
                    <Input type="date" {...form.register("approvalDate")} />
                    {form.formState.errors.approvalDate && (
                      <p className="text-xs text-destructive">Required</p>
                    )}
                  </div>

                  {!isOpen && (
                    <div className="flex flex-col gap-1.5">
                      <Label>Closed Date</Label>
                      <Input
                        type="date"
                        {...form.register("closedDate")}
                      />
                      {form.formState.errors.closedDate && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.closedDate.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {annualFeeAmount > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700">
                      First Year Waived?
                    </span>
                    <div className="flex gap-2">
                      {[
                        { label: "No", value: false },
                        { label: "Yes", value: true },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          className={`px-3 py-1 rounded-md text-sm font-medium border ${
                            form.watch("isFirstYearFeeWaived") === opt.value
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-slate-600 border-slate-200"
                          }`}
                          onClick={() =>
                            form.setValue("isFirstYearFeeWaived", opt.value)
                          }
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    rows={3}
                    placeholder="Add any notes about this card..."
                    {...form.register("userNote")}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {form.watch("userNote")?.length ?? 0} / 500
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sign-up Bonuses */}
          <section className="bg-slate-50 rounded-2xl p-4 space-y-4">
            <SectionTitle>Sign-up Bonuses</SectionTitle>

            {subs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subs.map((sub, index) => {
                  const category = categories.find((c) => c.id === sub.earningTypeId);
                  return (
                    <SubMiniCard
                      key={index}
                      subAmount={sub.subAmount}
                      minimumSpendAmount={sub.minimumSpendAmount}
                      subPeriod={sub.subPeriod}
                      earningTypeName={sub.earningTypeName ?? category?.displayName ?? undefined}
                      currency={category?.currency}
                      isEditable
                      onEdit={() => openEditSub(index)}
                      onDelete={() => removeSub(index)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
                <Gift className="size-10 text-slate-400 mx-auto mb-2" />
                <p className="font-medium text-slate-600">
                  No sign-up bonuses tracked yet.
                </p>
                <p className="text-xs text-muted-foreground">
                  Add a bonus to track spend hurdles and reward potential.
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="button" onClick={openAddSub}>
                Create Bonus
              </Button>
            </div>
          </section>

          {/* Benefits (read-only) */}
          {display?.cardBenefits && display.cardBenefits.length > 0 && (
            <section className="bg-slate-50 rounded-xl p-4">
              <SectionTitle className="mb-3">Included Benefits</SectionTitle>
              <CardBenefits cardBenefits={display.cardBenefits} />
            </section>
          )}

          {submitError && (
            <p className="text-sm text-destructive text-center">{submitError}</p>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            {onCancel ? (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                nativeButton={false}
                render={<a href="/dashboard" />}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              <Save />
              {isPending ? "Saving…" : "Save Card"}
            </Button>
          </div>
        </form>
      </div>

      <SubDialog
        open={subDialogOpen}
        onOpenChange={setSubDialogOpen}
        categories={categories}
        seed={editingSubIndex != null ? subs[editingSubIndex] : undefined}
        onSave={handleSubSave}
      />
    </div>
  );
}
