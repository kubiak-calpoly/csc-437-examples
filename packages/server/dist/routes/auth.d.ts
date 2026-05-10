import { NextFunction, Request, Response } from "express";
declare const router: import("express-serve-static-core").Router;
export declare function authenticateUser(req: Request, res: Response, next: NextFunction): void;
export default router;
