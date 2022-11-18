import { UserRole } from "./enums";

export interface UserDetail {
  _id: string;
  username: string;
  password: string;
  role: UserRole;
  fullname: string;
  email: string;
  avatar?: Buffer;
  createAt: string;
  modifiedAt: string;
}
