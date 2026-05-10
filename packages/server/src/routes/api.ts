import express from "express";
import entourageRouter from "./entourages.ts";
import travelerRouter from "./travelers.ts";
import tourRouter from "./tours.ts";

const router = express.Router();

router.use("/entourages", entourageRouter);
router.use("/travelers", travelerRouter);
router.use("/tours", tourRouter);

export default router;
