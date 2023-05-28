import { DiscountTypeEnum } from "./enums";

export interface Discount {
  _id: string;
  code: string;
  type: DiscountTypeEnum;
  description: string;
  value: number;
  amount: number;
  exp: number;
  used?: number;
  enable: boolean;
}

export interface AddEditDiscountRequest {
  code: string;
  type: DiscountTypeEnum;
  description: string;
  value: number;
  amount?: number;
  exp: string | null;
  enable?: boolean;
}

export interface DetailDiscount {
  _id: string;
  code: string;
  type: DiscountTypeEnum;
  description: string;
  value: number;
  amount: number;
  used?: number;
  exp: number;
  enable: boolean;
}
