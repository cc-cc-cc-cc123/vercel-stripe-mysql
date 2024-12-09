export interface UsageHistoryItem {
  targetAccount: string;
  date: string;
  type: "free" | "premium";
  remainingSearches: number | "-";
}
