import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.authState || initialState;

export const selectAuth = createSelector([selectSlice], (state) => state);
