import { UserDetail } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getDetailUser = async (userId: string): Promise<UserDetail> => {
  const response = await instanceWithToken.get(`v1/profile/${userId}`);
  return response.data;
};

const userService = { getDetailUser };

export default userService;
