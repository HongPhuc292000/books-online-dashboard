import querystring from "query-string";
import { Pageable, Member, Filter, AddEditMemberRequest } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getListMembers = async (params: Filter): Promise<Pageable<Member>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/member?${query}`);
  return response.data;
};

const deleteMember = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/member/${id}`);
  return response.data;
};

const addNewMember = async (formValue: AddEditMemberRequest) => {
  const response = await instanceWithToken.post("v1/member", formValue);
  return response.data;
};

const getDetailMember = async (id: string) => {
  const response = await instanceWithToken.get(`v1/member/${id}`);
  return response.data;
};

const editMember = async (id: string, formValue: AddEditMemberRequest) => {
  const response = await instanceWithToken.put(`v1/member/${id}`, formValue);
  return response.data;
};

const memberService = {
  getListMembers,
  deleteMember,
  addNewMember,
  getDetailMember,
  editMember,
};

export default memberService;
