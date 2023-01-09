import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import discountService from "services/discount";

import {
  Filter,
  Discount,
  Pageable,
  AddEditDiscountRequest,
  DetailDiscount,
} from "types";

import { discountActions as actions } from ".";

function* getAllDiscounts(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Discount> = yield call(
      discountService.getListDiscounts,
      action.payload
    );
    yield put(actions.getAllDiscountsSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

function* deleleDiscount(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(discountService.deleteDiscount, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

function* addNewDiscount(
  action: PayloadAction<AddEditDiscountRequest, string, (error?: any) => void>
) {
  try {
    yield call(discountService.addNewDiscount, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("addFailure");
    }
  }
}

function* getDetailDiscount(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailDiscount = yield call(
      discountService.getDetailDiscount,
      action.payload
    );
    yield put(actions.getDetailDiscountSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getDetailFailure");
    }
  }
}

function* editDiscount(
  action: PayloadAction<
    {
      id: string;
      formData: AddEditDiscountRequest;
    },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formData } = action.payload;
    yield call(discountService.editDiscount, id, formData);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("editFailure");
    }
  }
}

export function* discountSaga() {
  yield takeLatest(actions.getAllDiscounts, getAllDiscounts);
  yield takeLatest(actions.deleleDiscount, deleleDiscount);
  yield takeLatest(actions.addNewDiscount, addNewDiscount);
  yield takeLatest(actions.editDiscount, editDiscount);
  yield takeLatest(actions.getDetailDiscount, getDetailDiscount);
}
