import { BookState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, Filter, Pageable } from "types";

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
  },
});

// Action creators are generated for each case reducer function
export const { actions: bookActions } = bookSlice;

export default bookSlice.reducer;
