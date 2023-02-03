import { AuthorState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddEditAuthorRequest, Author, AuthorFilter, Pageable } from "types";

export const initialState: AuthorState = {};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    getAllAuthors: {
      reducer() {},
      prepare(payload: AuthorFilter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllAuthorsSuccess(state, action: PayloadAction<Pageable<Author>>) {
      state.listAuthor = action.payload;
    },
    deleleAuthor: {
      reducer() {},
      prepare(payload: string, meta: (error: any) => void) {
        return { payload, meta };
      },
    },
    addNewAuthor: {
      reducer() {},
      prepare(
        payload: { formData: AddEditAuthorRequest; file: null | File },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
    getDetailAuthor: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailAuthorSuccess(state, action: PayloadAction<Author | undefined>) {
      state.detailAuthor = action.payload;
    },
    editAuthor: {
      reducer() {},
      prepare(
        payload: {
          id: string;
          formData: AddEditAuthorRequest;
          file: null | File;
        },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authorActions } = authorSlice;

export default authorSlice.reducer;
