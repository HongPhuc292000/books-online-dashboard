import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) =>
  state.salesFiguresState || initialState;

export const selectSalesFigures = createSelector(
  [selectSlice],
  (state) => state
);
