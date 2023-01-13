import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import bookService from "services/book";
import { Book, Filter, Pageable } from "types";

import { bookActions as actions } from ".";

function* getAllBooks(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Book> = yield call(
      bookService.getAllBooks,
      action.payload
    );
    yield put(actions.getAllBooksSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

function* deleteBook(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(bookService.deleteBook, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

export function* bookSaga() {
  yield takeLatest(actions.getAllBooks, getAllBooks);
  yield takeLatest(actions.deleteBook, deleteBook);
}
