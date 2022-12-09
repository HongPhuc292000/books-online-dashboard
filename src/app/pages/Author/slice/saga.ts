import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authorService from "services/author";

import { AddNewAuthorRequest, Author, Filter, Pageable } from "types";

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
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

function* deleleAuthor(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(authorService.deleteAuthor, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

function* addNewAuthor(
  action: PayloadAction<AddNewAuthorRequest, string, (error?: any) => void>
) {
  try {
    yield call(authorService.addNewCategory, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("addFailure");
    }
  }
}

export function* authorSaga() {
  yield takeLatest(actions.getAllAuthors, getAllAuthors);
  yield takeLatest(actions.deleleAuthor, deleleAuthor);
  yield takeLatest(actions.addNewAuthor, addNewAuthor);
}
