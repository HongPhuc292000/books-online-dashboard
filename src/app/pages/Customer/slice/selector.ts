import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState } from ".";

const selectSlice = (state: RootState) => state.customerState || initialState;

export const selectCustomer = createSelector([selectSlice], (state) => state);
