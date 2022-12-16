import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import discountService from "services/discount";

import { Filter, Discount, Pageable } from "types";

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

export function* discountSaga() {
  yield takeLatest(actions.getAllDiscounts, getAllDiscounts);
  yield takeLatest(actions.deleleDiscount, deleleDiscount);
}
