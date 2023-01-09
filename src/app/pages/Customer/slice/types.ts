import { DetailCustomer, Customer, Pageable } from "types";

/* --- STATE --- */
export interface CustomerState {
  listCustomers?: Pageable<Customer>;
  detailCustomer?: DetailCustomer;
}
