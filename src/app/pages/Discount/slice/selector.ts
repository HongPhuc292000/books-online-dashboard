import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.discountState || initialState;

export const selectDiscount = createSelector([selectSlice], (state) => state);
