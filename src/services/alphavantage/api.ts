import { alphavantageApiClient } from "./client";

type Period = "month" | "day";

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

const fetchCompanySeriesBySymbol = (symbol: string, period: Period) => {
  const PERIODS_FUNCTIONS = {
    month: "TIME_SERIES_MONTHLY",
    day: "TIME_SERIES_DAILY"
  };

  return alphavantageApiClient.get(
    `/query?function=${PERIODS_FUNCTIONS[period]}&symbol=${symbol}`
  );
};

export { fetchCompanyPrice, searchCompanies, fetchCompanySeriesBySymbol };
