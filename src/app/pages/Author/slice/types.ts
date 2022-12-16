import { Author, Pageable } from "types";

/* --- STATE --- */
export interface AuthorState {
  listAuthor?: Pageable<Author>;
  detailAuthor: Author;
}
