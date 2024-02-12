import express, { Router } from "express";
import profiles from "./profiles";
import tours from "./tours";

const api = Router();

api.use(express.json());

api.use("/profiles", profiles);
api.use("/tours", tours);

export default api;
