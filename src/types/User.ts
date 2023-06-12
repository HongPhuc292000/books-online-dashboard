import { RolesPermission } from "./enums";

export interface UserDetail {
  _id: string;
  imageUrl?: string;
  username: string;
  password: string;
  fullname: string;
  email?: string;
  phoneNumber: string;
  roles: RolesPermission[];
  gender: string;
  birthday: string;
}
