import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import cors from "cors";
import { apiRouter } from "./routers";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/favicon.ico", (req, res) => {
  res.status(200);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message
  });
});

export { app };
