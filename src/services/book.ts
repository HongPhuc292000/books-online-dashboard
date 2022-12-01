import { Book } from "types/Book";
import { createService } from "./axios";

const bookUrl = process.env.REACT_APP_API_BOOK;
const instanceWithToken = createService(bookUrl);

const getAllBooks = async (): Promise<Book[]> => {
  const response = await instanceWithToken.get(`${bookUrl}`);
  return response.data;
};

const bookService = { getAllBooks };

export default bookService;
