import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.bookState || initialState;

export const selectBook = createSelector([selectSlice], (state) => state);
