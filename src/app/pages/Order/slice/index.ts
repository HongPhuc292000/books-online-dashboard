import { OrderState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddEditAuthorRequest,
  Author,
  AuthorFilter,
  Filter,
  Order,
  Pageable,
} from "types";

export const initialState: OrderState = {};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getAllOrders: {
      reducer() {},
      prepare(payload: Filter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllOrdersSuccess(state, action: PayloadAction<Pageable<Order>>) {
      state.listOrders = action.payload;
    },
    // deleleAuthor: {
    //   reducer() {},
    //   prepare(payload: string, meta: (error: any) => void) {
    //     return { payload, meta };
    //   },
    // },
    // addNewAuthor: {
    //   reducer() {},
    //   prepare(
    //     payload: { formData: AddEditAuthorRequest; file: null | File },
    //     meta: (error: any) => void
    //   ) {
    //     return { payload, meta };
    //   },
    // },
    // getDetailAuthor: {
    //   reducer() {},
    //   prepare(payload: string, meta: (error?: any) => void) {
    //     return { payload, meta };
    //   },
    // },
    // getDetailAuthorSuccess(state, action: PayloadAction<Author | undefined>) {
    //   state.detailAuthor = action.payload;
    // },
    // editAuthor: {
    //   reducer() {},
    //   prepare(
    //     payload: {
    //       id: string;
    //       formData: AddEditAuthorRequest;
    //       file: null | File;
    //     },
    //     meta: (error: any) => void
    //   ) {
    //     return { payload, meta };
    //   },
    // },
  },
});

// Action creators are generated for each case reducer function
export const { actions: orderActions } = orderSlice;

export default orderSlice.reducer;
