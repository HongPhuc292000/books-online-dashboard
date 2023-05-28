import querystring from "query-string";
import {
  Pageable,
  Discount,
  AddEditDiscountRequest,
  DiscountFilter,
} from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getListDiscounts = async (
  params: DiscountFilter
): Promise<Pageable<Discount>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/discount?${query}`);
  return response.data;
};

const deleteDiscount = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/discount/${id}`);
  return response.data;
};

const addNewDiscount = async (formValue: AddEditDiscountRequest) => {
  const response = await instanceWithToken.post("v1/discount", formValue);
  return response.data;
};

const getDetailDiscount = async (id: string) => {
  const response = await instanceWithToken.get(`v1/discount/${id}`);
  return response.data;
};

const editDiscount = async (id: string, formValue: AddEditDiscountRequest) => {
  const response = await instanceWithToken.put(`v1/discount/${id}`, formValue);
  return response.data;
};

const discountService = {
  getListDiscounts,
  deleteDiscount,
  addNewDiscount,
  editDiscount,
  getDetailDiscount,
};

export default discountService;
