import { PayloadAction } from "@reduxjs/toolkit";
import profitServices from "services/profit";
import {
  ProfitEachMonth,
  ProfitEachMonthQueries,
  ProfitEachYear,
  ProfitEachYearQueries,
  ProfitPerMonthOrYear,
  ProfitPerMonthQueries,
  ProfitPerYearQueries,
} from "types/Profit";
import { call, put, takeLatest } from "redux-saga/effects";

import { salesFiguresActions as actions } from ".";
import i18n from "locales/translation/i18n";

function* getSalesFiguresPerMonth(
  action: PayloadAction<ProfitPerMonthQueries, string, (error?: any) => void>
) {
  try {
    const result: ProfitPerMonthOrYear = yield call(
      profitServices.getProfitPerMonth,
      action.payload
    );
    yield put(actions.getSalesFiguresPerMonthSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("server_error");
    }
  }
}

function* getSalesFiguresEachMonth(
  action: PayloadAction<ProfitEachMonthQueries, string, (error?: any) => void>
) {
  try {
    const result: ProfitEachMonth[] = yield call(
      profitServices.getProfitEachMonth,
      action.payload
    );
    const dataSalesFiguesEachMonth = {
      labels: result.map((item) => i18n.t(`monthEnums.${item.month}`)),
      datasets: [
        {
          label: i18n.t("salesFigures.createdOrder"),
          data: result.map((item) => item.createdOrder),
          backgroundColor: "rgba(3, 169, 244, 0.5)",
        },
        {
          label: i18n.t("salesFigures.successOrder"),
          data: result.map((item) => item.successOrder),
          backgroundColor: "rgba(76, 175, 80, 0.5)",
        },
      ],
    };
    yield put(
      actions.getSalesFiguresEachMonthSuccess(dataSalesFiguesEachMonth)
    );
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("server_error");
    }
  }
}

function* getSalesFiguresPerYear(
  action: PayloadAction<ProfitPerYearQueries, string, (error?: any) => void>
) {
  try {
    const result: ProfitPerMonthOrYear = yield call(
      profitServices.getProfitPerYear,
      action.payload
    );
    yield put(actions.getSalesFiguresPerYearSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("server_error");
    }
  }
}

function* getSalesFiguresEachYear(
  action: PayloadAction<ProfitEachYearQueries, string, (error?: any) => void>
) {
  try {
    const result: ProfitEachYear[] = yield call(
      profitServices.getProfitEachYear,
      action.payload
    );
    const dataSalesFiguesEachYear = {
      labels: result.map((item) => item.year.toString()),
      datasets: [
        {
          label: i18n.t("salesFigures.createdOrder"),
          data: result.map((item) => item.createdOrder),
          backgroundColor: "rgba(3, 169, 244, 0.5)",
        },
        {
          label: i18n.t("salesFigures.successOrder"),
          data: result.map((item) => item.successOrder),
          backgroundColor: "rgba(76, 175, 80, 0.5)",
        },
      ],
    };
    yield put(actions.getSalesFiguresEachYearSuccess(dataSalesFiguesEachYear));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("server_error");
    }
  }
}

export function* salesFiguresSaga() {
  yield takeLatest(actions.getSalesFiguresPerMonth, getSalesFiguresPerMonth);
  yield takeLatest(actions.getSalesFiguresEachMonth, getSalesFiguresEachMonth);
  yield takeLatest(actions.getSalesFiguresPerYear, getSalesFiguresPerYear);
  yield takeLatest(actions.getSalesFiguresEachYear, getSalesFiguresEachYear);
}
