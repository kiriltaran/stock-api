import axios from "axios";

const config = {
  baseURL:
    process.env.ALPHAVANTAGE_API_BASE_URL || "https://www.alphavantage.co"
};

const alphavantageApiClient = axios.create(config);

alphavantageApiClient.interceptors.request.use(request => ({
  ...request,
  headers: {
    "X-Forwarded-For": `${Math.floor(Math.random() * 255) + 1}.${Math.floor(
      Math.random() * 255
    ) + 0}.${Math.floor(Math.random() * 255) + 0}.${Math.floor(
      Math.random() * 255
    ) + 0}`
  },
  params: {
    apikey: process.env.ALPHAVANTAGE_API_KEY || "OKC0BT76URCJ1QBU"
  }
}));

alphavantageApiClient.interceptors.response.use(({ data }) => data);

export { alphavantageApiClient };
