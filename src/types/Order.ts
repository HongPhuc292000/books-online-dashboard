import { OrderStatusesEnum, PaymentTypeEnum } from "./enums";

export interface SubOrder {
  productId: string;
  amount: number;
  reducedPrices: number;
  defaultPrices: number;
}

export interface Order {
  _id: string;
  customerId?: string;
  customerName?: string;
  status: OrderStatusesEnum;
  totalPrices: number;
  createdAt: string;
}

export interface AddOrderRequest {
  customerName: string;
  customerPhoneNumber: string;
  products: DetailBookByCode[];
  orderPrices: number;
  orderDiscountId?: string;
  orderDiscountPrices?: number;
  totalPrices: number;
  status: OrderStatusesEnum;
  checkout: boolean;
}

export interface DetailOrder {
  customerId: string;
  customerName: string;
  customerPhoneNumber: string;
  orderCode?: string;
  customerAddress?: string;
  paymentType: PaymentTypeEnum;
  products: DetailBookByCode[];
  status: OrderStatusesEnum;
  orderPrices: number;
  shipPrices?: number;
  shipDiscountPrices?: number;
  orderDiscountId?: string;
  orderDiscountPrices: number;
  totalPrices: number;
  createdAt: string;
  checkout: boolean;
  editAt: string;
}

export interface DetailCustomerGetByPhone {
  _id: string;
  fullname: string;
}

export interface DetailBookByCode {
  productId: string;
  bookCode: string;
  imageUrl: string;
  name: string;
  amount: number;
  defaultPrice: number;
  reducedPrice: number;
}
