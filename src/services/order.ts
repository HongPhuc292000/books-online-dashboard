import querystring from "query-string";
import {
  AddEditAuthorRequest,
  Author,
  AuthorFilter,
  SelectItemType,
  Pageable,
  Filter,
  Order,
  AddOrderRequest,
} from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllOrders = async (params: Filter): Promise<Pageable<Order>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/order?${query}`);
  return response.data;
};

// const getAuthorToSelect = async (): Promise<SelectItemType[]> => {
//   const response = await instanceWithToken.get("v1/author/allAuthors");
//   return response.data;
// };

const deleteOrder = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/order/${id}`);
  return response.data;
};

const addNewOrder = async (formValue: AddOrderRequest) => {
  const response = await instanceWithToken.post("v1/order", formValue);
  return response.data;
};

const getDetailOrder = async (id: string) => {
  const response = await instanceWithToken.get(`v1/order/${id}`);
  return response.data;
};

const editOrder = async (id: string, formValue: AddOrderRequest) => {
  const response = await instanceWithToken.put(`v1/order/${id}`, formValue);
  return response.data;
};

const orderService = {
  getAllOrders,
  addNewOrder,
  deleteOrder,
  getDetailOrder,
  editOrder,
  // getAuthorToSelect,
  // deleteAuthor,
  // addNewAuthor,
  // getDetailAuthor,
  // editAuthor,
};

export default orderService;
