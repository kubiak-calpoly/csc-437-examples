import express from "express";
import { authenticateUser } from "../auth";
import entourageRouter from "./entourages";
import profileRouter from "./profiles";
import tourRouter from "./tours";
import directionsRouter from "./directions";

const router = express.Router();

// all routes under this router require authentication
router.use(authenticateUser);

router.use("/entourages", entourageRouter);
router.use("/profiles", profileRouter);
router.use("/tours", tourRouter);
router.use("/directions", directionsRouter);

export default router;
