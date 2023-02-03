import querystring from "query-string";
import {
  AddNewCategoryRequest,
  Category,
  Filter,
  Pageable,
  SelectItemType,
} from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllCategories = async (
  params: Filter
): Promise<Pageable<Category>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/category?${query}`);
  return response.data;
};

const getCategoriesToSelect = async (): Promise<SelectItemType[]> => {
  const response = await instanceWithToken.get("v1/category/allCategories");
  return response.data;
};

const deleteCategory = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/category/${id}`);
  return response.data;
};

const addNewCategory = async (formValue: AddNewCategoryRequest) => {
  const response = await instanceWithToken.post("v1/category", formValue);
  return response.data;
};

const categoryService = {
  getAllCategories,
  deleteCategory,
  addNewCategory,
  getCategoriesToSelect,
};

export default categoryService;
