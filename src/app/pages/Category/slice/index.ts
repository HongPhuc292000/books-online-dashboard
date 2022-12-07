import { CategoryState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Filter, Pageable } from "types";

export const initialState: CategoryState = {};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategories: {
      reducer() {},
      prepare(params: Filter, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    getAllCategoriesSuccess(state, action: PayloadAction<Pageable<Category>>) {
      state.listCategories = action.payload;
    },
    deleleCategory: {
      reducer() {},
      prepare(id: string, meta: (message: any) => void) {
        return { payload: id, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: categoryActions } = categorySlice;

export default categorySlice.reducer;
