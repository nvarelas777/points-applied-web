"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubMiniCard } from "@/components/dashboard/sub-mini-card";
import type { EarningTypeCategory } from "@/types/card";

const subSchema = z
  .object({
    earningTypeId: z.number({ error: "Reward type is required" }),
    subAmount: z.number().min(1).max(1_000_000),
    minimumSpendRequired: z.boolean(),
    minimumSpendAmount: z.number().min(0).max(100_000).nullable(),
    subPeriod: z.number().min(1).max(12).nullable(),
  })
  .refine(
    (data) => !data.minimumSpendRequired || data.minimumSpendAmount != null,
    { path: ["minimumSpendAmount"], error: "Required" },
  )
  .refine((data) => !data.minimumSpendRequired || data.subPeriod != null, {
    path: ["subPeriod"],
    error: "Required",
  });

export type SubFormValues = z.infer<typeof subSchema>;

export interface SubResult {
  earningTypeId: number;
  earningTypeName?: string;
  subAmount: number;
  minimumSpendAmount: number | null;
  subPeriod: number | null;
}

export function SubDialog({
  open,
  onOpenChange,
  categories,
  seed,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: EarningTypeCategory[];
  seed?: Partial<SubResult> | null;
  onSave: (result: SubResult) => void;
}) {
  const form = useForm<SubFormValues>({
    resolver: zodResolver(subSchema),
    defaultValues: {
      earningTypeId: seed?.earningTypeId ?? (categories.length === 1 ? categories[0].id : undefined),
      subAmount: seed?.subAmount ?? 0,
      minimumSpendRequired: seed
        ? seed.minimumSpendAmount != null || seed.subPeriod != null
        : true,
      minimumSpendAmount: seed?.minimumSpendAmount ?? null,
      subPeriod: seed?.subPeriod ?? null,
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      earningTypeId:
        seed?.earningTypeId ?? (categories.length === 1 ? categories[0].id : undefined),
      subAmount: seed?.subAmount ?? 0,
      minimumSpendRequired: seed
        ? seed.minimumSpendAmount != null || seed.subPeriod != null
        : true,
      minimumSpendAmount: seed?.minimumSpendAmount ?? null,
      subPeriod: seed?.subPeriod ?? null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed]);

  const subAmount = form.watch("subAmount");
  const minimumSpendAmount = form.watch("minimumSpendAmount");
  const subPeriod = form.watch("subPeriod");
  const minimumSpendRequired = form.watch("minimumSpendRequired");

  const onSubmit = (values: SubFormValues) => {
    const categoryName = categories.find((c) => c.id === values.earningTypeId)
      ?.displayName;
    onSave({
      earningTypeId: values.earningTypeId,
      earningTypeName: categoryName ?? undefined,
      subAmount: values.subAmount,
      minimumSpendAmount: values.minimumSpendRequired
        ? values.minimumSpendAmount
        : null,
      subPeriod: values.minimumSpendRequired ? values.subPeriod : null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome Bonus</DialogTitle>
        </DialogHeader>

        <div className="relative p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
          <span className="absolute -top-2.5 left-4 bg-popover px-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            Live Preview
          </span>
          <SubMiniCard
            subAmount={subAmount || 0}
            minimumSpendAmount={minimumSpendRequired ? minimumSpendAmount : null}
            subPeriod={minimumSpendRequired ? subPeriod : null}
          />
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label>Reward Type</Label>
            <Select
              value={form.watch("earningTypeId")?.toString() ?? ""}
              onValueChange={(value) =>
                value && form.setValue("earningTypeId", Number(value), { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Reward Amount</Label>
            <Input
              type="number"
              placeholder="e.g. 60000"
              {...form.register("subAmount", { valueAsNumber: true })}
            />
            {form.formState.errors.subAmount && (
              <p className="text-xs text-destructive">
                Please enter a value between 1 and 1,000,000
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex items-center gap-3">
            <Checkbox
              checked={form.watch("minimumSpendRequired")}
              onCheckedChange={(checked) =>
                form.setValue("minimumSpendRequired", checked === true)
              }
            />
            <Label>Minimum Spend Required?</Label>
          </div>

          {minimumSpendRequired && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label>Minimum Spend (USD)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 4000"
                  {...form.register("minimumSpendAmount", { valueAsNumber: true })}
                />
                {form.formState.errors.minimumSpendAmount && (
                  <p className="text-xs text-destructive">Required</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Period (months)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 3"
                  {...form.register("subPeriod", { valueAsNumber: true })}
                />
                {form.formState.errors.subPeriod && (
                  <p className="text-xs text-destructive">Required</p>
                )}
              </div>
            </>
          )}
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save Bonus</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
