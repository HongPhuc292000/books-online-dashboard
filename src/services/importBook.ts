import querystring from "query-string";
import {
  AddEditImportBook,
  Filter,
  ImportBook,
  Pageable,
  UpdateImportBookStatusRequest,
} from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllImportBooks = async (
  params: Filter
): Promise<Pageable<ImportBook>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/importBook?${query}`);
  return response.data;
};

const addNewImportBook = async (formValue: AddEditImportBook) => {
  const response = await instanceWithToken.post("v1/importBook", formValue);
  return response.data;
};

const updateStatusImportBook = async (
  id: string,
  formValue: UpdateImportBookStatusRequest
) => {
  const response = await instanceWithToken.put(
    `v1/importBook/${id}`,
    formValue
  );
  return response.data;
};

const getDetailImportBook = async (id: string) => {
  const response = await instanceWithToken.get(`v1/importBook/${id}`);
  return response.data;
};

const importBookServices = {
  getAllImportBooks,
  addNewImportBook,
  updateStatusImportBook,
  getDetailImportBook,
};

export default importBookServices;
