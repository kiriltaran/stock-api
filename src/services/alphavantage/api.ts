import { alphavantageApiClient } from "./client";

const fetchCompanyPrice = (symbol: string) => {
  return alphavantageApiClient.get(
    `/query?function=GLOBAL_QUOTE&symbol=${symbol}`
  );
};

const searchCompanies = (query: string) => {
  return alphavantageApiClient.get(
    `/query?function=SYMBOL_SEARCH&keywords=${query}`
  );
};

export { fetchCompanyPriceBySymbol, searchCompaniesByQuery };
