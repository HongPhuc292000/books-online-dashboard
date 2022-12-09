import { AuthorState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewAuthorRequest, Author, Filter, Pageable } from "types";

export const initialState: AuthorState = {};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    getAllAuthors: {
      reducer() {},
      prepare(params: Filter, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    getAllAuthorsSuccess(state, action: PayloadAction<Pageable<Author>>) {
      state.listAuthor = action.payload;
    },
    deleleAuthor: {
      reducer() {},
      prepare(id: string, meta: (error: any) => void) {
        return { payload: id, meta };
      },
    },
    addNewAuthor: {
      reducer() {},
      prepare(formValue: AddNewAuthorRequest, meta: (error: any) => void) {
        return { payload: formValue, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authorActions } = authorSlice;

export default authorSlice.reducer;
