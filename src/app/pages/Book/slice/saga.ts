import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authorService from "services/author";
import bookService from "services/book";
import categoryService from "services/category";
import commonService from "services/common";
import {
  AddEditBookRequest,
  Book,
  Filter,
  Pageable,
  SelectItemType,
} from "types";

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

function* addNewBook(
  action: PayloadAction<
    { formData: AddEditBookRequest; file: null | File },
    string,
    (error?: any) => void
  >
) {
  try {
    const { file, formData } = action.payload;
    if (file) {
      const newUrl: string = yield call(
        commonService.uploadImage,
        file,
        "books"
      );
      yield call(bookService.addNewBook, { ...formData, imageUrl: newUrl });
    } else {
      yield call(bookService.addNewBook, formData);
    }
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("addFailure");
    }
  }
}

function* getAllAuthors(action: PayloadAction<(error?: any) => void>) {
  try {
    const result: SelectItemType[] = yield call(
      authorService.getAuthorToSelect
    );
    yield put(actions.getAllAuthorsSuccess(result));
    action.payload();
  } catch {
    action.payload();
  }
}

function* getAllCategories(action: PayloadAction<(error?: any) => void>) {
  try {
    const result: SelectItemType[] = yield call(
      categoryService.getCategoriesToSelect
    );
    yield put(actions.getAllCategoriesSuccess(result));
    action.payload();
  } catch {
    action.payload();
  }
}

export function* bookSaga() {
  yield takeLatest(actions.getAllBooks, getAllBooks);
  yield takeLatest(actions.deleteBook, deleteBook);
  yield takeLatest(actions.addNewBook, addNewBook);
  yield takeLatest(actions.getAllAuthors, getAllAuthors);
  yield takeLatest(actions.getAllCategories, getAllCategories);
}
