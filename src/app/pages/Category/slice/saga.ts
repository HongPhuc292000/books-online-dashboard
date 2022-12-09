import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import categoryService from "services/category";

import { AddNewCategoryRequest, Category, Filter, Pageable } from "types";

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
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

function* deleleCategory(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(categoryService.deleteCategory, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

function* addNewCategory(
  action: PayloadAction<AddNewCategoryRequest, string, (error?: any) => void>
) {
  try {
    yield call(categoryService.addNewCategory, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("addFailure");
    }
  }
}

export function* categorySaga() {
  yield takeLatest(actions.getAllCategories, getAllCategories);
  yield takeLatest(actions.deleleCategory, deleleCategory);
  yield takeLatest(actions.addNewCategory, addNewCategory);
}
