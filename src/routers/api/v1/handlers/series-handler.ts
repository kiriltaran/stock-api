import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { get, mapKeys, mapValues } from "lodash";
import { api as alphavantageApi } from "../../../../services/alphavantage";

type seriesPeriodKey = <K extends keyof typeof SERIES_PERIOD_KEYS>(
  key: K
) => typeof SERIES_PERIOD_KEYS[K];

const SERIES_PERIOD_KEYS = {
  day: "Time Series (Daily)",
  month: "Monthly Time Series"
};

const getSeriesPeriodKey: seriesPeriodKey = k => SERIES_PERIOD_KEYS[k];

const seriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.symbol || !req.query.period) {
      return next(createError(400));
    }

    const seriesResponse = await alphavantageApi.fetchCompanySeriesBySymbol(
      req.query.symbol,
      req.query.period
    );

    const transformResponseSeries = (series: object) =>
      mapValues(
        mapKeys(series, (value, key) => Date.parse(key)),
        value => Number(get(value, "4. close"))
      );

    res.status(200).json({
      name: get(seriesResponse, ["Meta Data", "2. Symbol"]),
      series: transformResponseSeries(
        get(seriesResponse, getSeriesPeriodKey(req.query.period))
      )
    });
  } catch (error) {
    next(createError());
  }
};

export { seriesHandler };
