import { ImportBook, ImportBookDetail, Pageable } from "types";

/* --- STATE --- */
export interface ImportBookState {
  listImportBooks?: Pageable<ImportBook>;
  importBookDetail?: ImportBookDetail;
}
