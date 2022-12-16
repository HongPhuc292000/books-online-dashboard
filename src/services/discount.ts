import querystring from "query-string";
import { Pageable, Discount, Filter } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getListDiscounts = async (
  params: Filter
): Promise<Pageable<Discount>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/discount?${query}`);
  return response.data;
};

const deleteDiscount = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/discount/${id}`);
  return response.data;
};

const discountService = { getListDiscounts, deleteDiscount };

export default discountService;
