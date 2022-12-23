export interface Member {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}

export interface AddEditMemberRequest {
  imageUrl?: string;
  username: string;
  password: string;
  fullname: string;
  email?: string;
  phoneNumber: string;
  roles?: string[];
  gender?: string;
  birthday: string;
}

export interface DetailMember {
  _id: string;
  imageUrl?: string;
  username: string;
  password: string;
  fullname: string;
  email?: string;
  phoneNumber: string;
  roles?: string[];
  gender?: string;
  birthday: string;
}
