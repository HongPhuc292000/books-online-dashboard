import querystring from "query-string";
import { AddNewAuthorRequest, Author, Filter, Pageable } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllAuthors = async (params: Filter): Promise<Pageable<Author>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/author?${query}`);
  return response.data;
};

const deleteAuthor = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/author/${id}`);
  return response.data;
};

const addNewCategory = async (formValue: AddNewAuthorRequest) => {
  const response = await instanceWithToken.post("v1/author", formValue);
  return response.data;
};

const authorService = { getAllAuthors, deleteAuthor, addNewCategory };

export default authorService;
