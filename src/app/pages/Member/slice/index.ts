import { MemberState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter, Member, Pageable } from "types";

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
  },
});

// Action creators are generated for each case reducer function
export const { actions: memberActions } = memberSlice;

export default memberSlice.reducer;
