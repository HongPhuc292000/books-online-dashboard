import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authorService from "services/author";

import {
  AddEditAuthorRequest,
  Author,
  AuthorFilter,
  Filter,
  Order,
  Pageable,
} from "types";

import commonService from "services/common";
import { orderActions as actions } from ".";
import orderService from "services/order";

function* getAllOrders(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Order> = yield call(
      orderService.getAllOrders,
      action.payload
    );
    yield put(actions.getAllOrdersSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

// function* deleleAuthor(
//   action: PayloadAction<string, string, (error?: any) => void>
// ) {
//   try {
//     yield call(authorService.deleteAuthor, action.payload);
//     action.meta();
//   } catch (error: any) {
//     if (error.response.data) {
//       action.meta(error.response.data);
//     } else {
//       action.meta("deleteFailure");
//     }
//   }
// }

// function* addNewAuthor(
//   action: PayloadAction<
//     { formData: AddEditAuthorRequest; file: null | File },
//     string,
//     (error?: any) => void
//   >
// ) {
//   try {
//     const { file, formData } = action.payload;
//     if (file) {
//       const newUrl: string = yield call(
//         commonService.uploadImage,
//         file,
//         "authors"
//       );
//       yield call(authorService.addNewAuthor, { ...formData, imageUrl: newUrl });
//     } else {
//       yield call(authorService.addNewAuthor, formData);
//     }
//     action.meta();
//   } catch (error: any) {
//     if (error.response.data) {
//       action.meta(error.response.data);
//     } else {
//       action.meta("addFailure");
//     }
//   }
// }

// function* getDetailAuthor(
//   action: PayloadAction<string, string, (error?: any) => void>
// ) {
//   try {
//     const result: Author = yield call(
//       authorService.getDetailAuthor,
//       action.payload
//     );
//     yield put(actions.getDetailAuthorSuccess(result));
//     action.meta();
//   } catch (error: any) {
//     if (error.response.data) {
//       action.meta(error.response.data);
//     } else {
//       action.meta("getDetailFailure");
//     }
//   }
// }

// function* editAuthor(
//   action: PayloadAction<
//     {
//       id: string;
//       formData: AddEditAuthorRequest;
//       file: null | File;
//       beforeImage?: string;
//     },
//     string,
//     (error?: any) => void
//   >
// ) {
//   try {
//     const { id, formData, file } = action.payload;
//     if (file) {
//       const newUrl: string = yield call(
//         commonService.uploadImage,
//         file,
//         "authors"
//       );
//       yield call(authorService.editAuthor, id, {
//         ...formData,
//         imageUrl: newUrl,
//       });
//     } else {
//       yield call(authorService.editAuthor, id, formData);
//     }
//     action.meta();
//   } catch (error: any) {
//     if (error.response.data) {
//       action.meta(error.response.data);
//     } else {
//       action.meta("addFailure");
//     }
//   }
// }

export function* orderSaga() {
  yield takeLatest(actions.getAllOrders, getAllOrders);
  // yield takeLatest(actions.deleleAuthor, deleleAuthor);
  // yield takeLatest(actions.addNewAuthor, addNewAuthor);
  // yield takeLatest(actions.getDetailAuthor, getDetailAuthor);
  // yield takeLatest(actions.editAuthor, editAuthor);
}
