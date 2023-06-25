import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.importBookState || initialState;

export const selectImportBook = createSelector([selectSlice], (state) => state);
