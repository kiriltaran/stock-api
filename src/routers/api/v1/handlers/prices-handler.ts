import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { get, first, map, isArray } from "lodash";
import { api as alphavantageApi } from "../../../../services/alphavantage";

const pricesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.symbol) {
      next(createError(400));
    }

    const fetchCompanyStockInfo = async (symbol: string) => {
      const [priceInfo, companyInfo] = await Promise.all([
        alphavantageApi.fetchCompanyPrice(symbol),
        alphavantageApi.searchCompanies(symbol)
      ]);

      return {
        symbol,
        name: get(first(get(companyInfo, ["bestMatches"])), "2. name"),
        price: Number(get(priceInfo, ["Global Quote", "05. price"])),
        change_percent: get(priceInfo, ["Global Quote", "10. change percent"])
      };
    };

    const prepareSymbol = (symbol: string) =>
      isArray(symbol) ? symbol : [symbol];

    const response = await Promise.all(
      map(prepareSymbol(req.query.symbol), symbol =>
        fetchCompanyStockInfo(symbol)
      )
    );

    res.status(200).json([...response]);
  } catch (error) {
    next(createError());
  }
};

export { pricesHandler };
