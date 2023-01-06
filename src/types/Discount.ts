import { DiscountTypeEnum } from "./enums";

export interface Discount {
  _id: string;
  code: string;
  type: string;
  value: number;
  amount: number;
  used: number;
}

export interface AddEditDiscountRequest {
  code: string;
  type: DiscountTypeEnum;
  value: number;
  amount?: number;
  used?: number;
  exp: string | null;
  enable?: boolean;
}

export interface DetailDiscount {
  _id: string;
  code: string;
  type: DiscountTypeEnum;
  value: number;
  amount: number;
  used?: number;
  exp: number;
  enable: boolean;
}
