import { BookState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddEditBookRequest,
  Book,
  Filter,
  Pageable,
  SelectItemType,
} from "types";

export const initialState: BookState = {};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getAllBooks: {
      reducer() {},
      prepare(payload: Filter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllBooksSuccess(state, action: PayloadAction<Pageable<Book>>) {
      state.listBooks = action.payload;
    },
    deleteBook: {
      reducer() {},
      prepare(payload: string, meta: (error: any) => void) {
        return { payload, meta };
      },
    },
    addNewBook: {
      reducer() {},
      prepare(
        payload: { formData: AddEditBookRequest; file: null | File },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
    getAllAuthors: {
      reducer() {},
      prepare(payload: () => void) {
        return { payload };
      },
    },
    getAllAuthorsSuccess(state, action: PayloadAction<SelectItemType[]>) {
      state.listAuthors = action.payload;
    },
    getAllCategories: {
      reducer() {},
      prepare(payload: () => void) {
        return { payload };
      },
    },
    getAllCategoriesSuccess(state, action: PayloadAction<SelectItemType[]>) {
      state.listCategories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: bookActions } = bookSlice;

export default bookSlice.reducer;
