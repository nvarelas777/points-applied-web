"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="app-card mt-6">
        <div className="app-card-body flex flex-col items-center text-center py-12">
          <div className="rounded-full bg-red-100 p-4 mb-4">
            <TriangleAlert className="size-10 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Unable to load cards
          </h2>
          <p className="text-sm text-slate-600 max-w-md mb-6">
            Something went wrong while loading your cards. Please try again.
          </p>
          <Button onClick={reset}>
            <RefreshCw />
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
