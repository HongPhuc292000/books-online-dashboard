import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.authorState || initialState;

export const selectAuthor = createSelector([selectSlice], (state) => state);
