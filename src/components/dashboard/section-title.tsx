import { cn } from "@/lib/utils";

// Shared heading for the "Card Information" / "Included Benefits" style
// section headers inside card-form and card-detail-dialog, so the two
// views can't drift into different tags/styles for the same role.
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={cn("pa-h3 text-center", className)}>{children}</h3>;
}
