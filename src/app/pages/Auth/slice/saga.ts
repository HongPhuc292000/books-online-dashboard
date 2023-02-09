import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authService from "services/auth";
import commonService from "services/common";
import memberService from "services/user";
import { LoginRequest, LoginResponse, UserDetail } from "types";
import { CookiesEnum } from "types/enums";
import { deleteCookie, setCookie } from "utils/cookies";
import { authActions as actions } from ".";

function* login(
  action: PayloadAction<LoginRequest, string, (error?: any) => void>
) {
  try {
    const result: LoginResponse = yield call(authService.login, action.payload);
    setCookie(CookiesEnum.AUTHTOKEN, result.accessToken);
    setCookie(CookiesEnum.REFRESHTOKEN, result.refreshToken);
    action.meta();
  } catch (error: any) {
    action.meta(error.response.data);
  }
}

function* logout(action: PayloadAction<(error?: any) => void>) {
  try {
    yield call(authService.logout);
    deleteCookie(CookiesEnum.AUTHTOKEN);
    deleteCookie(CookiesEnum.REFRESHTOKEN);
    action.payload();
  } catch {
    action.payload();
  }
}

function* getUserInfo(action: PayloadAction<string>) {
  try {
    const userInfo: UserDetail = yield call(
      memberService.getDetailUser,
      action.payload
    );
    yield put(actions.getUserInfoSuccess(userInfo));
  } catch (error: any) {
    console.log(error);
  }
}

function* refreshToken(action: PayloadAction<(error?: any) => void>) {
  try {
    const result: LoginResponse = yield call(authService.refreshToken);
    setCookie(CookiesEnum.AUTHTOKEN, result.accessToken);
    setCookie(CookiesEnum.REFRESHTOKEN, result.refreshToken);
    action.payload();
  } catch (error: any) {
    action.payload(error.response.data);
  }
}

function* getAllRoles(action: PayloadAction<(error?: any) => void>) {
  try {
    const roles: string[] = yield call(commonService.getAllRoles);
    yield put(actions.getAllRolesSuccess(roles));
    action.payload();
  } catch (error: any) {
    action.payload(error.response.data);
  }
}

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.logout.type, logout);
  yield takeLatest(actions.getUserInfo.type, getUserInfo);
  yield takeLatest(actions.refreshToken.type, refreshToken);
  yield takeLatest(actions.getAllRoles.type, getAllRoles);
}
