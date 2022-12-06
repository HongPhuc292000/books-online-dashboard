import { Category, Pageable } from "types";

/* --- STATE --- */
export interface CategoryState {
  listCategories?: Pageable<Category>;
}
