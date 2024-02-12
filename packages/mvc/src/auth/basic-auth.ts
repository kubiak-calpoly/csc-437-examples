import { Request, Response } from "express";
import { verify } from "../services/credentials";

type NextFn = () => any;

export function basicAuth(
  req: Request,
  res: Response,
  nextFn: NextFn
) {
  const authHeader = req.headers["authorization"];
  const match =
    authHeader && authHeader.match(/Basic\s+([a-zA-Z0-9]+)/i);

  if (!match) {
    console.log("No credentials provided in request", req);
    res
      .status(401)
      .append(
        "WWW-Authenticate",
        `Basic realm="${req.hostname}", charset="UTF-8"`
      )
      .end();
  } else {
    //Getting the 2nd part of the auth header (the token)
    const [username, password] =
      match && atob(match[1]).split(":");

    verify(username, password)
      .then((username) => {
        const redactedCreds = `${username}:<REDACTED>`;
        req.headers["authorization"] = `Basic ${btoa(
          redactedCreds
        )}`;
        nextFn();
      })
      .catch(() => res.status(403).end());
  }
}

export function authenticatedUser(req: Request) {
  const authHeader = req.headers["authorization"];
  const match =
    authHeader && authHeader.match(/Basic\s+([a-zA-Z0-9]+)/i);

  return match && atob(match[1]).split(":")[0];
}
