export interface UserDetail {
  _id: string;
  imageUrl?: string;
  username: string;
  password: string;
  fullname: string;
  email?: string;
  phoneNumber: string;
  roles: string[];
  gender: string;
  birthday: string;
}
