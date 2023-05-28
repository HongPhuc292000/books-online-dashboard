import { CommonKeyEnum } from "./enums";

export interface Filter {
  searchKey?: string;
  page?: number;
  size?: number;
}

export interface AuthorFilter extends Filter {
  forSelect?: CommonKeyEnum.SELECT;
}

export interface DiscountFilter extends Filter {
  minDate?: number;
  all?: boolean;
  status?: boolean;
}
