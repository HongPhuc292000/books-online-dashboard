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

export interface BooksForSelect {
  _id: string;
  name: string;
  bookCode: string;
  defaultPrice: number;
  reducedPrice?: number;
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

export interface DetailBook {
  _id: string;
  imageUrl: string;
  name: string;
  bookCode: string;
  authorId: string;
  view: number;
  isFull: boolean;
  amount: number;
  categoryIds: string[];
  defaultPrice: number;
  reducedPrice?: number;
  status: EnableEnum;
}
