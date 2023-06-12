import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddOrderRequest,
  DetailCustomerGetByPhone,
  DetailOrder,
  Discount,
  DiscountFilter,
  Filter,
  Order,
  Pageable,
} from "types";
import { OrderState } from "./types";
import moment from "moment";

export const initialState: OrderState = {
  filterCode: { page: 0, size: 10, minDate: moment().valueOf(), status: true },
};

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
    deleleOrder: {
      reducer() {},
      prepare(id: string, meta: (error: any) => void) {
        return { payload: id, meta };
      },
    },
    addNewOrder: {
      reducer() {},
      prepare(payload: AddOrderRequest, meta: (error: any) => void) {
        return { payload, meta };
      },
    },
    getDetailOrder: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailOrderSuccess(
      state,
      action: PayloadAction<DetailOrder | undefined>
    ) {
      state.detailOrder = action.payload;
    },
    editOrder: {
      reducer() {},
      prepare(
        payload: {
          id: string;
          formData: AddOrderRequest;
        },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
    getDetailBookByCode: {
      reducer() {},
      prepare(payload: string, meta: (error: any) => void) {
        return { payload, meta };
      },
    },
    getDetailCustomerByPhone: {
      reducer() {},
      prepare(payload: string) {
        return { payload };
      },
    },
    getDetailCustomerByPhoneSuccess(
      state,
      action: PayloadAction<DetailCustomerGetByPhone>
    ) {
      state.detailCustomer = action.payload;
    },

    getAllDiscounts: {
      reducer() {},
      prepare(payload: DiscountFilter) {
        return { payload };
      },
    },
    getAllDiscountsSuccess(state, action: PayloadAction<Pageable<Discount>>) {
      state.listCodesForOrder = action.payload;
    },
    setFilterCode(state, action: PayloadAction<DiscountFilter>) {
      state.filterCode = action.payload;
    },
    setSelectedDiscount(state, action: PayloadAction<Discount | undefined>) {
      state.selectedDiscount = action.payload;
    },
    resetSelectedDiscount: {
      reducer() {},
      prepare(payload: string) {
        return { payload };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: orderActions } = orderSlice;

export default orderSlice.reducer;
