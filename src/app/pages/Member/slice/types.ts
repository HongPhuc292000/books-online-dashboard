import { DetailMember, Member, Pageable } from "types";

/* --- STATE --- */
export interface MemberState {
  listMembers?: Pageable<Member>;
  detailMember?: DetailMember;
}
