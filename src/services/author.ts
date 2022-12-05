import querystring from "query-string";
import { Author, Filter, Pageable } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllAuthors = async (params: Filter): Promise<Pageable<Author>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/author?${query}`);
  return response.data;
};

const authorService = { getAllAuthors };

export default authorService;
