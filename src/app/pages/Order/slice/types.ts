import {
  DetailCustomerGetByPhone,
  DetailOrder,
  Discount,
  DiscountFilter,
  Order,
  Pageable,
} from "types";

/* --- STATE --- */
export interface OrderState {
  listOrders?: Pageable<Order>;
  detailCustomer?: DetailCustomerGetByPhone;
  listCodesForOrder?: Pageable<Discount>;
  filterCode: DiscountFilter;
  selectedDiscount?: Discount;
  detailOrder?: DetailOrder;
}
