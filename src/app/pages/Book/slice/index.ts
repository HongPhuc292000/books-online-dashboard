import { BookState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "types";

export const initialState: BookState = {};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getAllBooks: {
      reducer() {},
      prepare(meta: (error?: any) => void) {
        return { payload: meta };
      },
    },
    getAllBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.listBook = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: bookActions } = bookSlice;

export default bookSlice.reducer;
