import { OrderStatusesEnum } from "./enums";

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

interface Product {
  productId: string;
  amount: number;
  reducedPrices: number;
  defaultPrices: number;
}

export interface AddOrderRequest {
  customerId?: string;
  customerName: string;
  products: Product[];
  phoneNumber: String;
  status: OrderStatusesEnum;
}
