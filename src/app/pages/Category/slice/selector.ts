import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.categoryState || initialState;

export const selectCategory = createSelector([selectSlice], (state) => state);
