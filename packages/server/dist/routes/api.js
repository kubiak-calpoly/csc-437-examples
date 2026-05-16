import express from "express";
import entourageRouter from "./entourages.js";
import travelerRouter from "./travelers.js";
import tourRouter from "./tours.js";
const router = express.Router();
router.use("/entourages", entourageRouter);
router.use("/travelers", travelerRouter);
router.use("/tours", tourRouter);
export default router;
