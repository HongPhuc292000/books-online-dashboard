import { Member, Pageable } from "types";

/* --- STATE --- */
export interface MemberState {
  listMembers?: Pageable<Member>;
}
