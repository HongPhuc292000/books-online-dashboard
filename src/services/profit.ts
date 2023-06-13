import querystring from "query-string";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";
import {
  ProfitEachMonth,
  ProfitEachMonthQueries,
  ProfitEachYear,
  ProfitEachYearQueries,
  ProfitPerMonthOrYear,
  ProfitPerMonthQueries,
  ProfitPerYearQueries,
} from "types/Profit";

const instanceWithToken = createService(baseUrl);

const getProfitPerMonth = async (
  params: ProfitPerMonthQueries
): Promise<ProfitPerMonthOrYear> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/profit/month?${query}`);
  return response.data;
};

const getProfitEachMonth = async (
  params: ProfitEachMonthQueries
): Promise<ProfitEachMonth> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/profit/eachMonth?${query}`);
  return response.data;
};

const getProfitPerYear = async (
  params: ProfitPerYearQueries
): Promise<ProfitPerMonthOrYear> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/profit/year?${query}`);
  return response.data;
};

const getProfitEachYear = async (
  params: ProfitEachYearQueries
): Promise<ProfitEachYear> => {
  const query = querystring.stringify(params);
  const response = await instanceWithToken.get(`v1/profit/eachYear?${query}`);
  return response.data;
};

const profitServices = {
  getProfitPerMonth,
  getProfitEachMonth,
  getProfitPerYear,
  getProfitEachYear,
};

export default profitServices;
