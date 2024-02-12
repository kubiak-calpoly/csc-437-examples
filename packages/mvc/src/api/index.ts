import express, { Router } from "express";
import profiles from "./profiles";

const api = Router();

api.use(express.json());

api.use("/profiles", profiles);

export default api;
