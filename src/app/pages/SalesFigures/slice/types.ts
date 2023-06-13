import { GraphData, ProfitPerMonthOrYear } from "types/Profit";

/* --- STATE --- */
export interface SalesFiguresStatus {
  profitPerMonth?: ProfitPerMonthOrYear;
  profitEachMonth?: GraphData;
  profitPerYear?: ProfitPerMonthOrYear;
  profitEachYear?: GraphData;
}
