import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res
    .status(500)
    .send({ errors: [{ message: "Something went wrong" }] });
}
