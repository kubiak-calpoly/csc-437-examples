import express from "express";
import { authenticateUser } from "../auth";
import profileRouter from "./profiles";
import entourageRouter from "./entourages";

const router = express.Router();

// all routes under this router require authentication
router.use(authenticateUser);

router.use("/profiles", profileRouter);
router.use("/entourages", entourageRouter);

export default router;
