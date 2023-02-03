import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import commonService from "services/common";
import memberService from "services/member";
import {
  AddEditMemberRequest,
  DetailMember,
  Filter,
  Member,
  Pageable,
} from "types";

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

function* deleteMember(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    yield call(memberService.deleteMember, action.payload);
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("deleteFailure");
    }
  }
}

function* addNewMember(
  action: PayloadAction<
    { formData: AddEditMemberRequest; file: null | File },
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
        "members"
      );
      yield call(memberService.addNewMember, { ...formData, imageUrl: newUrl });
    } else {
      yield call(memberService.addNewMember, formData);
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

function* getDetailMember(
  action: PayloadAction<string, string, (error?: any) => void>
) {
  try {
    const result: DetailMember = yield call(
      memberService.getDetailMember,
      action.payload
    );
    yield put(actions.getDetailMemberSuccess(result));
    action.meta();
  } catch (error: any) {
    if (error.response.data) {
      action.meta(error.response.data);
    } else {
      action.meta("getDetailFailure");
    }
  }
}

function* editMember(
  action: PayloadAction<
    {
      id: string;
      formData: AddEditMemberRequest;
      file: null | File;
    },
    string,
    (error?: any) => void
  >
) {
  try {
    const { id, formData, file } = action.payload;
    if (file) {
      const newUrl: string = yield call(
        commonService.uploadImage,
        file,
        "members"
      );
      yield call(memberService.editMember, id, {
        ...formData,
        imageUrl: newUrl,
      });
    } else {
      yield call(memberService.editMember, id, formData);
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

export function* memberSaga() {
  yield takeLatest(actions.getAllMembers, getAllMembers);
  yield takeLatest(actions.deleleMember, deleteMember);
  yield takeLatest(actions.addNewMember, addNewMember);
  yield takeLatest(actions.getDetailMember, getDetailMember);
  yield takeLatest(actions.editMember, editMember);
}
