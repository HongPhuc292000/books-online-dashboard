import { EnableEnum } from "./enums";

interface AuthorInfo {
  _id: string;
  name: string;
}

interface CategoryInfo {
  _id: string;
  name: string;
}

export interface Book {
  _id: string;
  name: string;
  authorId: AuthorInfo;
  view: number;
  amount: number;
  categoryIds: CategoryInfo[];
  defaultPrice: number;
  reducedPrice?: number;
  status: EnableEnum;
}
