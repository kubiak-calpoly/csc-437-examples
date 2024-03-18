import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import credentials from "./services/credentials";

export interface LoginCredential {
  username: string;
  pwd: string;
}

function generateAccessToken(
  username: string
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET || "NO_SECRET",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
}

export function registerUser(req: Request, res: Response) {
  const { username, pwd } = req.body as LoginCredential; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create(username, pwd)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => {
        res.status(201).send({ token: token });
      });
  }
}

export function loginUser(req: Request, res: Response) {
  const { username, pwd } = req.body as LoginCredential;

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .verify(username, pwd)
      .then((goodUser: string) =>
        generateAccessToken(goodUser || "anonymous")
      )
      .then((token) => res.status(200).send({ token }))
      .catch((error) => res.status(401).send("Unauthorized"));
  }
}

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "INVALID JWS: NO SECRET",
      (error, decoded) => {
        if (decoded) {
          console.log("Decoded token", decoded);
          next();
        } else {
          res.status(401).end();
        }
      }
    );
  }
}
