import express from "express";
import { authenticateUser } from "../auth";
import entourageRouter from "./entourages";
import profileRouter from "./profiles";
import tourRouter from "./tours";

const router = express.Router();

// all routes under this router require authentication
router.use(authenticateUser);

router.use("/entourages", entourageRouter);
router.use("/profiles", profileRouter);
router.use("/tours", tourRouter);

export default router;
