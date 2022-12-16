import querystring from "query-string";
import { Pageable, Member, Filter } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const instanceWithToken = createService(baseUrl);

const getListMembers = async (params: Filter): Promise<Pageable<Member>> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/member?${query}`);
  return response.data;
};

const memberService = { getListMembers };

export default memberService;
