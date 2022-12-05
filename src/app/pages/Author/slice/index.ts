import { AuthorState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Author, Filter, Pageable } from "types";

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
    getAllAuthorsSuccess(
      state,
      action: PayloadAction<Pageable<Author> | undefined>
    ) {
      state.listAuthor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authorActions } = authorSlice;

export default authorSlice.reducer;
