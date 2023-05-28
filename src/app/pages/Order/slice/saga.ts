import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  AddOrderRequest,
  DetailBookByCode,
  DetailCustomerGetByPhone,
  DetailDiscount,
  DetailOrder,
  Discount,
  DiscountFilter,
  Filter,
  Order,
  Pageable,
} from "types";

import bookService from "services/book";
import customerService from "services/customer";
import orderService from "services/order";
import { orderActions as actions } from ".";
import discountService from "services/discount";
import moment from "moment";

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

function* deleleOrder(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(orderService.deleteOrder, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

function* addNewOrder(
  action: PayloadAction<AddOrderRequest, string, (error?: any) => void>
) {
  try {
    yield call(orderService.addNewOrder, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("addFailure");
    }
  }
}

function* getDetailOrder(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailOrder = yield call(
      orderService.getDetailOrder,
      action.payload
    );
    yield put(actions.getDetailOrderSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getDetailFailure");
    }
  }
}

function* editOrder(
  action: PayloadAction<
    {
      id: string;
      formData: AddOrderRequest;
    },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formData } = action.payload;
    yield call(orderService.editOrder, id, formData);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("editFailure");
    }
  }
}

function* getDetailBookByCode(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailBookByCode = yield call(
      bookService.getDetailBook,
      action.payload
    );
    action.meta(result);
  } catch (error: any) {
    action.meta();
  }
}

function* getDetailCustomerByPhone(action: PayloadAction<string>) {
  try {
    const result: DetailCustomerGetByPhone = yield call(
      customerService.getDetailCustomer,
      action.payload
    );
    yield put(actions.getDetailCustomerByPhoneSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* getAllDiscounts(action: PayloadAction<DiscountFilter>) {
  try {
    const result: Pageable<Discount> = yield call(
      discountService.getListDiscounts,
      action.payload
    );
    yield put(actions.getAllDiscountsSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* resetSelectedDiscount(action: PayloadAction<string>) {
  try {
    const result: DetailDiscount = yield call(
      discountService.getDetailDiscount,
      action.payload
    );
    yield put(actions.setSelectedDiscount(result));
  } catch (error: any) {
    console.log(error);
  }
}

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
  yield takeLatest(actions.deleleOrder, deleleOrder);
  yield takeLatest(actions.addNewOrder, addNewOrder);
  yield takeLatest(actions.getDetailBookByCode, getDetailBookByCode);
  yield takeLatest(actions.getDetailCustomerByPhone, getDetailCustomerByPhone);
  yield takeLatest(actions.getAllDiscounts, getAllDiscounts);
  yield takeLatest(actions.getDetailOrder, getDetailOrder);
  yield takeLatest(actions.resetSelectedDiscount, resetSelectedDiscount);
  yield takeLatest(actions.editOrder, editOrder);
}
