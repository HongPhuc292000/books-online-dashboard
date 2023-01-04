import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import bookService from "services/book";

import { Book } from "types";

import { bookActions as actions } from ".";

function* getAllBooks(action: PayloadAction<(error?: any) => void>) {
  try {
    const result: Book[] = yield call(bookService.getAllBooks);
    yield put(actions.getAllBooksSuccess(result));
    action.payload();
  } catch (error: any) {
    action.payload(error.response.data);
  }
}

export function* bookSaga() {
  yield takeLatest(actions.getAllBooks, getAllBooks);
}
