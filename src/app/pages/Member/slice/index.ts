import { MemberState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddEditMemberRequest,
  DetailMember,
  Filter,
  Member,
  Pageable,
} from "types";

export const initialState: MemberState = {};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    getAllMembers: {
      reducer() {},
      prepare(payload: Filter, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getAllMembersSuccess(state, action: PayloadAction<Pageable<Member>>) {
      state.listMembers = action.payload;
    },
    deleleMember: {
      reducer() {},
      prepare(payload: string, meta: (error: any) => void) {
        return { payload, meta };
      },
    },
    addNewMember: {
      reducer() {},
      prepare(
        payload: { formData: AddEditMemberRequest; file: null | File },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
    getDetailMember: {
      reducer() {},
      prepare(payload: string, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getDetailMemberSuccess(
      state,
      action: PayloadAction<DetailMember | undefined>
    ) {
      state.detailMember = action.payload;
    },
    editMember: {
      reducer() {},
      prepare(
        payload: {
          id: string;
          formData: AddEditMemberRequest;
          file: null | File;
          beforeImage?: string;
        },
        meta: (error: any) => void
      ) {
        return { payload, meta };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: memberActions } = memberSlice;

export default memberSlice.reducer;
