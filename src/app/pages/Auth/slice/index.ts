import { AuthState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "types";
import { UserDetail } from "types/User";

export const initialState: AuthState = { roles: [] };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer() {},
      prepare(params: LoginRequest, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    logout: {
      reducer() {},
      prepare(meta: (error?: any) => void) {
        return { payload: meta };
      },
    },
    getUserInfo: {
      reducer() {},
      prepare(userId: string) {
        return { payload: userId };
      },
    },
    getUserInfoSuccess(state, action: PayloadAction<UserDetail>) {
      state.me = action.payload;
    },
    refreshToken: {
      reducer() {},
      prepare(meta: (error?: any) => void) {
        return { payload: meta };
      },
    },
    getAllRoles: {
      reducer() {},
      prepare(meta: (error?: any) => void) {
        return { payload: meta };
      },
    },
    getAllRolesSuccess(state, action: PayloadAction<string[]>) {
      state.roles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;

export default authSlice.reducer;
