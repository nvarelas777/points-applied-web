"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CardBenefit } from "@/types/card";

const RECURRENCE_CLASSES: Record<string, string> = {
  Annual: "bg-indigo-50 text-indigo-700",
  "Semi-Annual": "bg-yellow-50 text-yellow-700",
  Quarterly: "bg-amber-50 text-amber-700",
  Monthly: "bg-emerald-50 text-emerald-700",
  Weekly: "bg-teal-50 text-teal-700",
  Daily: "bg-violet-50 text-violet-700",
  OneTime: "bg-slate-100 text-slate-700",
};

function BenefitTags({ benefit }: { benefit: CardBenefit }) {
  return (
    <>
      {benefit.category === "Membership" && (
        <span className="inline-block px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-medium mb-1.5">
          Membership
        </span>
      )}
      {benefit.tags?.map((tag) => (
        <span
          key={tag}
          className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-1.5 mr-1"
        >
          {tag}
        </span>
      ))}
    </>
  );
}

export function BenefitCard({
  benefit,
  renderExtra,
}: {
  benefit: CardBenefit;
  renderExtra?: (benefit: CardBenefit) => React.ReactNode;
}) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const checkTruncation = () => {
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    };

    checkTruncation();

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);
    return () => observer.disconnect();
  }, [benefit.description]);

  return (
    <details className="group rounded-xl bg-white border border-slate-100">
      <summary
        className={`list-none [&::-webkit-details-marker]:hidden p-3 ${isTruncated ? "cursor-pointer" : "cursor-default"}`}
        onClick={(e) => {
          if (!isTruncated) e.preventDefault();
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium">
            {benefit.shortDisplayName || benefit.fullDisplayName}
          </h4>
          {benefit.recurrencePeriod && (
            <span
              className={`shrink-0 px-2 py-0.5 rounded-md pa-label ${RECURRENCE_CLASSES[benefit.recurrencePeriod] ?? "bg-slate-100 text-slate-700"}`}
            >
              {benefit.recurrencePeriod}
            </span>
          )}
        </div>
        {renderExtra?.(benefit)}
        <BenefitTags benefit={benefit} />
        <div className="flex items-start justify-between gap-2 mt-1">
          <p
            ref={descRef}
            className="app-item-desc line-clamp-2 group-open:line-clamp-none"
          >
            {benefit.description}
          </p>
          {isTruncated && (
            <ChevronDown className="size-4 text-slate-400 shrink-0 mt-0.5 transition-transform group-open:rotate-180" />
          )}
        </div>
      </summary>
    </details>
  );
}
