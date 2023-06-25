import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  AddEditImportBook,
  Filter,
  ImportBook,
  ImportBookDetail,
  Pageable,
  UpdateImportBookStatusRequest,
} from "types";

import { importBookActions as actions } from ".";
import importBookServices from "services/importBook";

function* getAllImportBooks(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<ImportBook> = yield call(
      importBookServices.getAllImportBooks,
      action.payload
    );
    yield put(actions.getAllImportBooksSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

function* addNewImportBook(
  action: PayloadAction<AddEditImportBook, string, (error?: any) => void>
) {
  try {
    yield call(importBookServices.addNewImportBook, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("addFailure");
    }
  }
}

function* getDetailImportBook(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: ImportBookDetail = yield call(
      importBookServices.getDetailImportBook,
      action.payload
    );
    yield put(actions.getDetailImportBookSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getDetailFailure");
    }
  }
}

function* editImportBook(
  action: PayloadAction<
    {
      id: string;
      formData: UpdateImportBookStatusRequest;
    },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formData } = action.payload;
    yield call(importBookServices.updateStatusImportBook, id, formData);
    const result: ImportBookDetail = yield call(
      importBookServices.getDetailImportBook,
      id
    );
    yield put(actions.getDetailImportBookSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("editFailure");
    }
  }
}

export function* importBookSaga() {
  yield takeLatest(actions.getAllImportBooks, getAllImportBooks);
  yield takeLatest(actions.addNewImportBook, addNewImportBook);
  yield takeLatest(actions.getDetailImportBook, getDetailImportBook);
  yield takeLatest(actions.editImportBook, editImportBook);
}
