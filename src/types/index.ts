export * from "./PageHeader";
export * from "./Auth";
export * from "./User";
export * from "./Book";
export * from "./Author";
export * from "./Category";
export * from "./Member";
export * from "./Discount";
export * from "./Customer";

export * from "./Filter";
export * from "./Address";

export interface Pageable<T> {
  data?: T[];
  total?: number;
  page?: number;
  size?: number;
}

export interface ImageFileType {
  file: File | null;
  url?: string;
}
