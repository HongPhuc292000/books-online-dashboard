import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import commonService from "services/common";
import customerService from "services/customer";
import {
  AddEditCustomerRequest,
  DetailCustomer,
  Filter,
  Customer,
  Pageable,
} from "types";

import { customerActions as actions } from ".";

function* getAllCustomers(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Customer> = yield call(
      customerService.getListCustomers,
      action.payload
    );
    yield put(actions.getAllCustomersSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

function* deleteCustomer(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(customerService.deleteCustomer, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

function* addNewCustomer(
  action: PayloadAction<
    { formData: AddEditCustomerRequest; file: null | File },
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
        "customers"
      );
      yield call(customerService.addNewCustomer, {
        ...formData,
        imageUrl: newUrl,
      });
    } else {
      yield call(customerService.addNewCustomer, formData);
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

function* getDetailCustomer(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailCustomer = yield call(
      customerService.getDetailCustomer,
      action.payload
    );
    yield put(actions.getDetailCustomerSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getDetailFailure");
    }
  }
}

function* editCustomer(
  action: PayloadAction<
    {
      id: string;
      formData: AddEditCustomerRequest;
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
        "customers"
      );
      yield call(customerService.editCustomer, id, {
        ...formData,
        imageUrl: newUrl,
      });
    } else {
      yield call(customerService.editCustomer, id, formData);
    }
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("editFailure");
    }
  }
}

export function* customerSaga() {
  yield takeLatest(actions.getAllCustomers, getAllCustomers);
  yield takeLatest(actions.deleleCustomer, deleteCustomer);
  yield takeLatest(actions.addNewCustomer, addNewCustomer);
  yield takeLatest(actions.getDetailCustomer, getDetailCustomer);
  yield takeLatest(actions.editCustomer, editCustomer);
}
