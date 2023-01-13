import querystring from "query-string";
import { Filter, Pageable } from "types";
import { Book } from "types/Book";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllBooks = async (params: Filter): Promise<Pageable<Book>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/book?${query}`);
  return response.data;
};

const deleteBook = async (id: string) => {
  const response = await instanceWithToken.delete(`v1/book/${id}`);
  return response.data;
};

const bookService = { getAllBooks, deleteBook };

export default bookService;
