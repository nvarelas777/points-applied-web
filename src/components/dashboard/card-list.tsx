"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, CreditCard, FilterX, PlusCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddCardFlow } from "@/components/dashboard/add-card-flow";
import { CardRow } from "@/components/dashboard/card-row";
import type { BankCard } from "@/types/card";
import type { UserCreditCard } from "@/types/user-card";

const ALL = "All";
type SortField = "approvalDate" | "cardName" | "bankName";
type StatusFilter = "All" | "open" | "closed";
type TypeFilter = "All" | "Personal" | "Business";

export function CardList({ cards, bankCards }: { cards: UserCreditCard[]; bankCards: BankCard[] }) {
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [bankFilter, setBankFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(ALL);
  const [sortField, setSortField] = useState<SortField>("approvalDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const bankOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const card of cards) {
      if (!map.has(card.bankName)) {
        map.set(card.bankName, card.displayBankName || card.bankName);
      }
    }
    return Array.from(map.entries())
      .map(([bankName, displayBankName]) => ({ bankName, displayBankName }))
      .sort((a, b) => a.displayBankName.localeCompare(b.displayBankName));
  }, [cards]);

  const filteredCards = useMemo(() => {
    let result = cards;

    if (bankFilter !== ALL) {
      result = result.filter((card) => card.bankName === bankFilter);
    }
    if (statusFilter === "open") {
      result = result.filter((card) => !card.closedDate);
    } else if (statusFilter === "closed") {
      result = result.filter((card) => !!card.closedDate);
    }
    if (typeFilter !== ALL) {
      result = result.filter((card) => card.cardType === typeFilter);
    }

    const getValue = (card: UserCreditCard) => {
      switch (sortField) {
        case "approvalDate":
          return card.approvalDate;
        case "cardName":
          return card.cardName;
        case "bankName":
          return card.bankName;
      }
    };

    return [...result].sort((a, b) => {
      const valA = getValue(a);
      const valB = getValue(b);
      if (valA === valB) return 0;
      if (valA == null) return sortDirection === "asc" ? -1 : 1;
      if (valB == null) return sortDirection === "asc" ? 1 : -1;
      const cmp = valA < valB ? -1 : 1;
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [cards, bankFilter, statusFilter, typeFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredCards.length / pageSize) || 1;
  const pagedCards = filteredCards.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const resetFilters = () => {
    setBankFilter(ALL);
    setStatusFilter(ALL);
    setTypeFilter(ALL);
    setPageIndex(0);
  };

  const onSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setPageIndex(0);
  };

  const SortIcon = sortDirection === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="app-card">
      <div className="app-card-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="app-title">My Cards</div>
          <p className="pa-h4 text-slate-300">Manage and track your credit card portfolio</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setAddCardOpen(true)}
        >
          <PlusCircle />
          Add New Card
        </Button>
      </div>

      <div className="app-card-body space-y-4">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
            <Select
              value={bankFilter}
              onValueChange={(value) => {
                setBankFilter(value ?? ALL);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Bank Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Banks</SelectItem>
                {bankOptions.map((bank) => (
                  <SelectItem
                    key={bank.bankName}
                    value={bank.bankName}
                  >
                    {bank.displayBankName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter((value as StatusFilter | null) ?? ALL);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Card Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={(value) => {
                setTypeFilter((value as TypeFilter | null) ?? ALL);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Card Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Types</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={resetFilters}
            >
              <RotateCcw />
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden lg:inline pa-label mr-2">Cards per page:</span>
            {[10, 20, 50].map((size) => (
              <button
                key={size}
                type="button"
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  pageSize === size ? "bg-accent text-white shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setPageSize(size);
                  setPageIndex(0);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {filteredCards.length > 0 && (
          <div className="hidden md:grid bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl pa-label tracking-wider grid-cols-12 gap-4">
            <button
              type="button"
              className="col-span-4 flex items-center gap-2 hover:text-primary transition-colors text-left"
              onClick={() => onSortChange("cardName")}
            >
              <span>Card & Bank</span>
              {sortField === "cardName" && <SortIcon className="size-4" />}
            </button>
            <button
              type="button"
              className="col-span-7 flex items-center gap-2 hover:text-primary transition-colors text-left"
              onClick={() => onSortChange("approvalDate")}
            >
              <span>Status & Details</span>
              {sortField === "approvalDate" && <SortIcon className="size-4" />}
            </button>
            <div className="col-span-1 flex items-center justify-end gap-3 text-right">
              <span>Actions</span>
            </div>
          </div>
        )}

        {filteredCards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              {cards.length > 0 ? <FilterX className="size-10 text-primary" /> : <CreditCard className="size-10 text-primary" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {cards.length > 0 ? "No cards match your filters" : "No cards yet"}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-5 max-w-md">
              {cards.length > 0
                ? "Try adjusting your filters to see more cards in your portfolio."
                : "Get started by adding your first credit card to track rewards, benefits, and manage your portfolio."}
            </p>
            {cards.length === 0 ? (
              <Button onClick={() => setAddCardOpen(true)}>
                <PlusCircle />
                Add Your First Card
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={resetFilters}
              >
                <RotateCcw />
                Reset Filters
              </Button>
            )}
          </div>
        )}

        {filteredCards.length > 0 && (
          <div className="space-y-4 mt-2">
            {pagedCards.map((card) => (
              <CardRow
                key={card.id}
                card={card}
              />
            ))}
          </div>
        )}

        {filteredCards.length > 0 && (
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Showing {pageIndex * pageSize + 1} - {Math.min((pageIndex + 1) * pageSize, filteredCards.length)} of {filteredCards.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={pageIndex === 0}
                onClick={() => setPageIndex((i) => i - 1)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={pageIndex + 1 >= totalPages}
                onClick={() => setPageIndex((i) => i + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={addCardOpen}
        onOpenChange={setAddCardOpen}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <AddCardFlow
            bankCards={bankCards}
            onCancel={() => setAddCardOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
