import { NextFunction, Request, Response } from "express";
import { HTTPError } from "./HTTPError";

class ErrorHandler {
  private isHTTPError(error: Error): boolean {
    return error instanceof HTTPError;
  }

  public handleError(
    error: Error | HTTPError,
    response?: Response,
    next?: NextFunction
  ): void {
    if (error instanceof HTTPError && response) {
      this.handleHTTPError(error as HTTPError, response);
    } else {
      this.handleCriticalError(error, response);
    }
    if (next) next(error);
  }

  handleHTTPError(error: HTTPError, res: Response) {
    res
      .status(error.statusCode)
      .send(
        `<h1>HTTP Error (${error.statusCode})</h1><p>${error.message}</p>`
      );
    console.log(
      `HTTP Error (${error.statusCode})`,
      error.message
    );
  }

  handleCriticalError(error: Error, res?: Response) {
    if (res) {
      res
        .status(500)
        .send(
          `<h1>Internal Server Error (500)</h1><p>${error}</p>`
        );
    } else {
      console.log("Application Error", error.message);
    }
  }
}

export const errorHandler = new ErrorHandler();
