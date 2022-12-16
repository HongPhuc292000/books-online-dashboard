import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import memberService from "services/member";

import { Filter, Member, Pageable } from "types";

import { memberActions as actions } from ".";

function* getAllMembers(
  action: PayloadAction<Filter, string, (error?: any) => void>
) {
  try {
    const result: Pageable<Member> = yield call(
      memberService.getListMembers,
      action.payload
    );
    yield put(actions.getAllMembersSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getListFailure");
    }
  }
}

export function* memberSaga() {
  yield takeLatest(actions.getAllMembers, getAllMembers);
}
