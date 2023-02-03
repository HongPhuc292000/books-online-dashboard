import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddEditCustomerRequest,
  Customer,
  DetailCustomer,
  Filter,
  Pageable,
} from "types";
import { CustomerState } from "./types";

export const initialState: CustomerState = {};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getAllCustomers: {
      reducer() {},
      prepare(payload: Filter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllCustomersSuccess(state, action: PayloadAction<Pageable<Customer>>) {
      state.listCustomers = action.payload;
    },
    deleleCustomer: {
      reducer() {},
      prepare(payload: string, meta: (error: any) => void) {
        return { payload, meta };
      },
    },
    addNewCustomer: {
      reducer() {},
      prepare(
        payload: { formData: AddEditCustomerRequest; file: null | File },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
    getDetailCustomer: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailCustomerSuccess(
      state,
      action: PayloadAction<DetailCustomer | undefined>
    ) {
      state.detailCustomer = action.payload;
    },
    editCustomer: {
      reducer() {},
      prepare(
        payload: {
          id: string;
          formData: AddEditCustomerRequest;
          file: null | File;
        },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: customerActions } = customerSlice;

export default customerSlice.reducer;
