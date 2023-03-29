import { Order, Pageable } from "types";

/* --- STATE --- */
export interface OrderState {
  listOrders?: Pageable<Order>;
}
