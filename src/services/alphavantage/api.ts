import { alphavantageApiClient } from "./client";

const fetchCompanyPriceBySymbol = (symbol: string) => {
  return alphavantageApiClient.get(
    `/query?function=GLOBAL_QUOTE&symbol=${symbol}`
  );
};

const searchCompaniesByQuery = (query: string) => {
  return alphavantageApiClient.get(
    `/query?function=SYMBOL_SEARCH&keywords=${query}`
  );
};

export { fetchCompanyPriceBySymbol, searchCompaniesByQuery };
