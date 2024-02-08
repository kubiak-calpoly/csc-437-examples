import express, { Request, Response } from "express";
import profileRouter from "./profiles";
import { authenticateUser } from "../auth";

const router = express.Router();

// all routes under this router require authentication
router.use(authenticateUser);

router.use("/profiles", profileRouter);

export default router;
