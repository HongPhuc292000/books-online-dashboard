import { CommonKeyEnum } from "./enums";

export interface Filter {
  searchKey?: string;
  page?: number;
  size?: number;
}

export interface AuthorFilter extends Filter {
  forSelect?: CommonKeyEnum.SELECT;
}
