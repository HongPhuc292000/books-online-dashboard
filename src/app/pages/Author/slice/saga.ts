import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authorService from "services/author";

import { AddEditAuthorRequest, Author, AuthorFilter, Pageable } from "types";

import commonService from "services/common";
import { authorActions as actions } from ".";

function* getAllAuthors(
  action: PayloadAction<AuthorFilter, string, (error?: any) => void>
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
  action: PayloadAction<
    { formData: AddEditAuthorRequest; file: null | File },
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
        "authors"
      );
      yield call(authorService.addNewAuthor, { ...formData, imageUrl: newUrl });
    } else {
      yield call(authorService.addNewAuthor, formData);
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

function* getDetailAuthor(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: Author = yield call(
      authorService.getDetailAuthor,
      action.payload
    );
    yield put(actions.getDetailAuthorSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getDetailFailure");
    }
  }
}

function* editAuthor(
  action: PayloadAction<
    {
      id: string;
      formData: AddEditAuthorRequest;
      file: null | File;
      beforeImage?: string;
    },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formData, file, beforeImage } = action.payload;
    if (beforeImage && beforeImage !== formData.imageUrl) {
      yield call(commonService.deleteImage, beforeImage);
    }
    if (file) {
      const newUrl: string = yield call(
        commonService.uploadImage,
        file,
        "authors"
      );
      yield call(authorService.editAuthor, id, {
        ...formData,
        imageUrl: newUrl,
      });
    } else {
      yield call(authorService.editAuthor, id, formData);
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

export function* authorSaga() {
  yield takeLatest(actions.getAllAuthors, getAllAuthors);
  yield takeLatest(actions.deleleAuthor, deleleAuthor);
  yield takeLatest(actions.addNewAuthor, addNewAuthor);
  yield takeLatest(actions.getDetailAuthor, getDetailAuthor);
  yield takeLatest(actions.editAuthor, editAuthor);
}
