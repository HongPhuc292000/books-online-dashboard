export interface UserDetail {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  email: string;
  avatar?: Buffer;
  createAt: string;
  modifiedAt: string;
}
