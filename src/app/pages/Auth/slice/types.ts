import { UserDetail } from "types/User";

/* --- STATE --- */
export interface AuthState {
  me?: UserDetail;
  roles: string[];
}
