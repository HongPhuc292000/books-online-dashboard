import { UserDetail } from "types";
import { createService } from "./axios";

const userUrl = process.env.REACT_APP_API_USER;
const instanceWithToken = createService(userUrl);

const getDetailUser = async (userId: string): Promise<UserDetail> => {
  const response = await instanceWithToken.get(`${userUrl}${userId}`);
  return response.data;
};

const userService = { getDetailUser };

export default userService;
