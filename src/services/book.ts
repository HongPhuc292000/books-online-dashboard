import { Book } from "types/Book";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getAllBooks = async (): Promise<Book[]> => {
  const response = await instanceWithToken.get(`v1/book`);
  return response.data;
};

const bookService = { getAllBooks };

export default bookService;
