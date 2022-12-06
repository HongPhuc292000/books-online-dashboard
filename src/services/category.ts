import querystring from "query-string";
import { Category, Filter, Pageable } from "types";
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

const categoryService = { getAllCategories };

export default categoryService;
