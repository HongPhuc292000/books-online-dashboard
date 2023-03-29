import querystring from "query-string";
import {
  AddEditAuthorRequest,
  Author,
  AuthorFilter,
  SelectItemType,
  Pageable,
  Filter,
  Order,
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

// const deleteAuthor = async (id: string) => {
//   const response = await instanceWithToken.delete(`v1/author/${id}`);
//   return response.data;
// };

// const addNewAuthor = async (formValue: AddEditAuthorRequest) => {
//   const response = await instanceWithToken.post("v1/author", formValue);
//   return response.data;
// };

// const getDetailAuthor = async (id: string) => {
//   const response = await instanceWithToken.get(`v1/author/${id}`);
//   return response.data;
// };

// const editAuthor = async (id: string, formValue: AddEditAuthorRequest) => {
//   const response = await instanceWithToken.put(`v1/author/${id}`, formValue);
//   return response.data;
// };

const orderService = {
  getAllOrders,
  // getAuthorToSelect,
  // deleteAuthor,
  // addNewAuthor,
  // getDetailAuthor,
  // editAuthor,
};

export default orderService;
