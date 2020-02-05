import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { get, first } from "lodash";
import { api as alphavantageApi } from "../../../../services/alphavantage";

const pricesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.company) {
      next(createError(400));
    }

    const [priceInfo, companyInfo] = await Promise.all([
      alphavantageApi.fetchCompanyPriceBySymbol(req.query.company),
      alphavantageApi.searchCompaniesByQuery(req.query.company)
    ]);

    res.status(200).json({
      name: get(first(get(companyInfo, ["bestMatches"])), "2. name"),
      price: Number(get(priceInfo, ["Global Quote", "05. price"]))
    });
  } catch (error) {
    next(createError());
  }
};

export { pricesHandler };
