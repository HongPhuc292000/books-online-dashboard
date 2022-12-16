import { DiscountState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter, Discount, Pageable } from "types";

export const initialState: DiscountState = {};

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    getAllDiscounts: {
      reducer() {},
      prepare(payload: Filter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllDiscountsSuccess(state, action: PayloadAction<Pageable<Discount>>) {
      state.listDiscounts = action.payload;
    },
    deleleDiscount: {
      reducer() {},
      prepare(id: string, meta: (error: any) => void) {
        return { payload: id, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: discountActions } = discountSlice;

export default discountSlice.reducer;
