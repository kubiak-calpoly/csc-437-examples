import express, { Request, Response } from "express";
import profileRouter from "./profiles";

const router = express.Router();

router.use("/profiles", profileRouter);

export default router;
