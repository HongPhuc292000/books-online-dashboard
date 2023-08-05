import { IdAndNameInfo } from "./Common";
import { EnableEnum } from "./enums";

export interface Book {
  _id: string;
  imageUrl: string;
  name: string;
  authorId?: IdAndNameInfo;
  view: number;
  amount: number;
  categoryIds: IdAndNameInfo[];
  defaultPrice: number;
  reducedPrice?: number;
  status: EnableEnum;
}

export interface AddEditBookRequest {
  imageUrl?: string;
  name: string;
  authorId?: string;
  amount?: number;
  categoryIds?: string[];
  content?: object;
  defaultPrice: number;
  reducedPrice?: number;
  bookCode: string;
  description?: string;
  status: EnableEnum | boolean;
  yearPublish?: number;
}

export interface DetailBook {
  _id: string;
  imageUrl: string;
  name: string;
  bookCode: string;
  authorId: IdAndNameInfo;
  view: number;
  amount: number;
  categoryIds?: IdAndNameInfo[];
  defaultPrice: number;
  reducedPrice?: number;
  description?: string;
  status: EnableEnum;
  yearPublish?: number;
}
