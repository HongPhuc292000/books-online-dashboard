import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GraphData,
  ProfitEachMonthQueries,
  ProfitEachYearQueries,
  ProfitPerMonthOrYear,
  ProfitPerMonthQueries,
  ProfitPerYearQueries,
} from "types/Profit";
import { SalesFiguresStatus } from "./types";

export const initialState: SalesFiguresStatus = {};

export const salesFiguresSlice = createSlice({
  name: "salesFigures",
  initialState,
  reducers: {
    getSalesFiguresPerMonth: {
      reducer() {},
      prepare(payload: ProfitPerMonthQueries, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getSalesFiguresPerMonthSuccess(
      state,
      action: PayloadAction<ProfitPerMonthOrYear | undefined>
    ) {
      state.profitPerMonth = action.payload;
    },
    getSalesFiguresEachMonth: {
      reducer() {},
      prepare(payload: ProfitEachMonthQueries, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getSalesFiguresEachMonthSuccess(
      state,
      action: PayloadAction<GraphData | undefined>
    ) {
      state.profitEachMonth = action.payload;
    },
    getSalesFiguresPerYear: {
      reducer() {},
      prepare(payload: ProfitPerYearQueries, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getSalesFiguresPerYearSuccess(
      state,
      action: PayloadAction<ProfitPerMonthOrYear | undefined>
    ) {
      state.profitPerYear = action.payload;
    },
    getSalesFiguresEachYear: {
      reducer() {},
      prepare(payload: ProfitEachYearQueries, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getSalesFiguresEachYearSuccess(
      state,
      action: PayloadAction<GraphData | undefined>
    ) {
      state.profitEachYear = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: salesFiguresActions } = salesFiguresSlice;

export default salesFiguresSlice.reducer;
