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

export interface AddEditBookRequest {
  imageUrl?: string;
  name: string;
  authorId?: string;
  isFull: boolean;
  amount?: number;
  categoryIds?: string[];
  content?: object;
  defaultPrice: number;
  reducedPrice?: number;
  bookCode: string;
  status: EnableEnum | boolean;
}
