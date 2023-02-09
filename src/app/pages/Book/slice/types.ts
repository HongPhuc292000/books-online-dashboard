import { Book, DetailBook, Pageable, SelectItemType } from "types";

/* --- STATE --- */
export interface BookState {
  listBooks?: Pageable<Book>;
  listAuthors?: SelectItemType[];
  listCategories?: SelectItemType[];
  detailBook?: DetailBook;
}
