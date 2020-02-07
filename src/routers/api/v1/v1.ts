import { Router } from "express";
import { pricesHandler, seriesHandler } from "./handlers";

const router = Router();

router.get("/prices", pricesHandler);
router.get("/series", seriesHandler);

export { router };
