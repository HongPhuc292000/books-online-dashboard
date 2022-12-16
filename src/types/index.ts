export * from "./PageHeader";
export * from "./Auth";
export * from "./User";
export * from "./Book";
export * from "./Author";
export * from "./Category";
export * from "./Member";
export * from "./Discount";

export * from "./Filter";

export interface Pageable<T> {
  data?: T[];
  total?: number;
  page?: number;
  size?: number;
}
