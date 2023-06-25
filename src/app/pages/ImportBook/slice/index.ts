import { ImportBookState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddEditImportBook,
  Filter,
  ImportBook,
  ImportBookDetail,
  Pageable,
  UpdateImportBookStatusRequest,
} from "types";

export const initialState: ImportBookState = {};

export const importBookSlice = createSlice({
  name: "importBook",
  initialState,
  reducers: {
    getAllImportBooks: {
      reducer() {},
      prepare(params: Filter, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    getAllImportBooksSuccess(
      state,
      action: PayloadAction<Pageable<ImportBook> | undefined>
    ) {
      state.listImportBooks = action.payload;
    },
    addNewImportBook: {
      reducer() {},
      prepare(formValue: AddEditImportBook, meta: (error: any) => void) {
        return { payload: formValue, meta };
      },
    },
    getDetailImportBook: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailImportBookSuccess(
      state,
      action: PayloadAction<ImportBookDetail | undefined>
    ) {
      state.importBookDetail = action.payload;
    },
    editImportBook: {
      reducer() {},
      prepare(
        payload: {
          id: string;
          formData: UpdateImportBookStatusRequest;
        },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: importBookActions } = importBookSlice;

export default importBookSlice.reducer;
