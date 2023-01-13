import { Book, Pageable } from "types";

/* --- STATE --- */
export interface BookState {
  listBooks?: Pageable<Book>;
}
