import { OrderStatusesEnum } from "./enums";

interface CustomerId {
  _id: string;
  name: string;
}

export interface SubOrder {
  productId: string;
  amount: number;
  reducedPrices: number;
  defaultPrices: number;
}

export interface Order {
  _id: string;
  customerId?: CustomerId;
  customerName?: string;
  status: OrderStatusesEnum;
  totalPrices: number;
  createdAt: string;
}
