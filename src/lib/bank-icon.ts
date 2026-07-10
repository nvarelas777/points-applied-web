const ALIASES: Record<string, string> = {
  americanexpress: "amex",
  amex: "amex",
  bankofamerica: "bankofamerica",
  capitalone: "capitalone",
  usbank: "usbank",
  wellsfargo: "wellsfargo",
};

function normalizeBankName(raw: string): string {
  return (raw || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

export function getBankIconPath(bankName: string | null | undefined): string {
  if (!bankName) return "/banks/default.svg";
  const norm = normalizeBankName(bankName);
  const base = ALIASES[norm] || norm || "default";
  return `/banks/${base}.svg`;
}
