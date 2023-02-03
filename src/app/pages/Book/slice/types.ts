import { Book, Pageable, SelectItemType } from "types";

/* --- STATE --- */
export interface BookState {
  listBooks?: Pageable<Book>;
  listAuthors?: SelectItemType[];
  listCategories?: SelectItemType[];
}
