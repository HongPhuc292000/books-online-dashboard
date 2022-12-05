import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authorService from "services/author";

import { Author, Filter, Pageable } from "types";

import { authorActions as actions } from ".";

function* getAllAuthors(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Author> = yield call(
      authorService.getAllAuthors,
      action.payload
    );
    yield put(actions.getAllAuthorsSuccess(result));
    action.meta();
  } catch (error: any) {
    action.meta(error.response.data);
  }
}

export function* authorSaga() {
  yield takeLatest(actions.getAllAuthors, getAllAuthors);
}
