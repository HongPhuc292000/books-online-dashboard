import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import categoryService from "services/category";

import { Category, Filter, Pageable } from "types";

import { categoryActions as actions } from ".";

function* getAllCategories(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Category> = yield call(
      categoryService.getAllCategories,
      action.payload
    );
    yield put(actions.getAllCategoriesSuccess(result));
    action.meta();
  } catch (error: any) {
    action.meta(error.response.data);
  }
}

export function* categorySaga() {
  yield takeLatest(actions.getAllCategories, getAllCategories);
}
