import { DetailDiscount, Discount, Pageable } from "types";

/* --- STATE --- */
export interface DiscountState {
  listDiscounts?: Pageable<Discount>;
  detailDiscount?: DetailDiscount;
}
