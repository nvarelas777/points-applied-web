"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Briefcase, Plus, Search, User, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BankCard } from "@/types/card";

const ALL = "All";

export type CardSelection = { isCustom: true } | { isCustom: false; cardId: number };

export function CardCatalogPicker({
  bankCards,
  onContinue,
  onCancel,
}: {
  bankCards: BankCard[];
  onContinue: (selection: CardSelection) => void;
  /** Defaults to navigating to /dashboard. */
  onCancel?: () => void;
}) {
  const catalog = useMemo(
    () =>
      bankCards.filter(
        (card) => card.bankName !== "Custom" && card.cardName !== "Custom",
      ),
    [bankCards],
  );

  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState(ALL);
  const [typeFilter, setTypeFilter] = useState<"" | "Personal" | "Business">("");
  const [selected, setSelected] = useState<CardSelection | null>(null);

  const bankOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const card of catalog) {
      if (!typeFilter || card.cardType === typeFilter) {
        map.set(card.bankName, card.displayBankName || card.bankName);
      }
    }
    return Array.from(map.entries())
      .map(([bankName, displayBankName]) => ({ bankName, displayBankName }))
      .sort((a, b) => a.displayBankName.localeCompare(b.displayBankName));
  }, [catalog, typeFilter]);

  const filteredCards = useMemo(() => {
    let result = catalog;
    if (bankFilter !== ALL) {
      result = result.filter((card) => card.bankName === bankFilter);
    }
    if (typeFilter) {
      result = result.filter((card) => card.cardType === typeFilter);
    }

    if (!search.trim()) return result.slice(0, 30);

    const fuse = new Fuse(result, {
      keys: [
        { name: "displayCardName", weight: 0.7 },
        { name: "displayBankName", weight: 0.2 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
    });
    return fuse.search(search).map((r) => r.item).slice(0, 60);
  }, [catalog, bankFilter, typeFilter, search]);

  const clearFilters = () => {
    setBankFilter(ALL);
    setTypeFilter("");
    setSelected(null);
  };

  return (
    <div className="app-card">
      <div className="app-card-header">
        <h2 className="app-title text-white">Add New Card</h2>
        <p className="pa-h4 text-slate-300">Search for your card, then continue</p>
      </div>

      <div className="app-card-body space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <div className="pa-label">Filter Results</div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <XCircle />
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="pa-label">Bank</label>
              <Select
                value={bankFilter}
                onValueChange={(value) => {
                  setBankFilter(value ?? ALL);
                  setSelected(null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Banks</SelectItem>
                  {bankOptions.map((bank) => (
                    <SelectItem key={bank.bankName} value={bank.bankName}>
                      {bank.displayBankName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="pa-label">Card Type</label>
              <div className="flex bg-slate-100 p-1 rounded-lg h-9">
                {(["", "Personal", "Business"] as const).map((type) => (
                  <button
                    key={type || "all"}
                    type="button"
                    className={`flex-1 rounded-md text-sm font-medium transition-all ${
                      typeFilter === type
                        ? "bg-white shadow-sm text-primary"
                        : "text-slate-500"
                    }`}
                    onClick={() => {
                      setTypeFilter(type);
                      setSelected(null);
                    }}
                  >
                    {type || "All"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Type or click to browse"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="border border-slate-200 rounded-xl bg-white h-80 overflow-auto">
            <button
              type="button"
              className="flex items-center gap-2 min-h-12 px-3 py-2 w-full text-left border-b border-slate-100 hover:bg-slate-50 text-primary"
              onClick={() => setSelected({ isCustom: true })}
            >
              <Plus className="size-4" />
              <span className="font-medium">Can&apos;t find it? Add a custom card</span>
            </button>
            {filteredCards.map((card) => {
              const isSelected =
                selected != null &&
                !selected.isCustom &&
                selected.cardId === card.cardId;
              return (
                <button
                  key={card.cardId}
                  type="button"
                  className={`flex items-center gap-3 min-h-12 px-3 py-2 w-full text-left border-b border-slate-100 last:border-b-0 hover:bg-slate-50 ${
                    isSelected ? "bg-indigo-50" : ""
                  }`}
                  onClick={() => setSelected({ isCustom: false, cardId: card.cardId })}
                >
                  {card.cardType === "Business" ? (
                    <Briefcase className="size-4 text-slate-300 shrink-0" />
                  ) : (
                    <User className="size-4 text-slate-300 shrink-0" />
                  )}
                  {card.imageUri && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.imageUri}
                      alt=""
                      className="w-[50px] h-auto shrink-0"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block app-kicker truncate">
                      {card.displayBankName}
                    </span>
                    <span className="block pa-h4 truncate">
                      {card.displayCardName}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          {onCancel ? (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <Button variant="outline" nativeButton={false} render={<a href="/dashboard" />}>
              Cancel
            </Button>
          )}
          <Button disabled={selected == null} onClick={() => selected && onContinue(selected)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
