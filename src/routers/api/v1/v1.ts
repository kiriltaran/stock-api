import { Router } from "express";
import { pricesHandler } from "./handlers";

const router = Router();

router.get("/prices", pricesHandler);

export { router };
