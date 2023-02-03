import querystring from "query-string";
import {
  AddEditAuthorRequest,
  Author,
  AuthorFilter,
  SelectItemType,
  Pageable,
} from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllAuthors = async (
  params: AuthorFilter
): Promise<Pageable<Author>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/author?${query}`);
  return response.data;
};

const getAuthorToSelect = async (): Promise<SelectItemType[]> => {
  const response = await instanceWithToken.get("v1/author/allAuthors");
  return response.data;
};

const deleteAuthor = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/author/${id}`);
  return response.data;
};

const addNewAuthor = async (formValue: AddEditAuthorRequest) => {
  const response = await instanceWithToken.post("v1/author", formValue);
  return response.data;
};

const getDetailAuthor = async (id: string) => {
  const response = await instanceWithToken.get(`v1/author/${id}`);
  return response.data;
};

const editAuthor = async (id: string, formValue: AddEditAuthorRequest) => {
  const response = await instanceWithToken.put(`v1/author/${id}`, formValue);
  return response.data;
};

const authorService = {
  getAllAuthors,
  getAuthorToSelect,
  deleteAuthor,
  addNewAuthor,
  getDetailAuthor,
  editAuthor,
};

export default authorService;
