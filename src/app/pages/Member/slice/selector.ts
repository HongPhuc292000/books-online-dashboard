import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.memberState || initialState;

export const selectMember = createSelector([selectSlice], (state) => state);
