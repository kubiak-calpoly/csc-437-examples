import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import credentials from "../services/credentials";

export function registerUser(req: Request, res: Response) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials.checkExists(username).then((exists) => {
      if (exists)
        res.status(409).send("Username already taken");
      else {
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(pwd, salt))
          .then((hashedPassword) => {
            credentials.create(username, hashedPassword);
          });
      }
    });
  }
}
