import querystring from "query-string";
import { Pageable, Customer, Filter, AddEditCustomerRequest } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getListCustomers = async (
  params: Filter
): Promise<Pageable<Customer>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/user?${query}`);
  return response.data;
};

const deleteCustomer = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/user/${id}`);
  return response.data;
};

const addNewCustomer = async (formValue: AddEditCustomerRequest) => {
  const response = await instanceWithToken.post("v1/user", formValue);
  return response.data;
};

const getDetailCustomer = async (id: string) => {
  const response = await instanceWithToken.get(`v1/user/${id}`);
  return response.data;
};

const editCustomer = async (id: string, formValue: AddEditCustomerRequest) => {
  const response = await instanceWithToken.put(`v1/user/${id}`, formValue);
  return response.data;
};

const customerService = {
  getListCustomers,
  deleteCustomer,
  addNewCustomer,
  getDetailCustomer,
  editCustomer,
};

export default customerService;
