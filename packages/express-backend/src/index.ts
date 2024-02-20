import express, { Request, Response } from "express";
import * as path from "path";
import { PathLike } from "node:fs";
import fs from "node:fs/promises";
import cors from "cors";
import { connect } from "./mongoConnect";
import { loginUser, registerUser } from "./auth";
import apiRouter from "./routes/api";

connect("blazing");

const app = express();
const port = process.env.PORT || 3000;

const frontend = "lit-frontend";
let cwd = process.cwd();
let dist: PathLike | undefined;
let indexHtml: PathLike | undefined;

try {
  indexHtml = require.resolve(frontend);
  dist = path.dirname(indexHtml.toString());
} catch (error: any) {
  console.log(`Could not resolve ${frontend}:`, error.code);
  dist = path.resolve(cwd, "..", frontend, "dist");
  indexHtml = path.resolve(dist, "index.html");
}

console.log(`Serving ${frontend} from`, dist);

if (dist) app.use(express.static(dist.toString()));

app.use(express.json({ limit: "500kb" }));
app.use(cors());

// app.options("*", cors());

app.post("/login", loginUser);
app.post("/signup", registerUser);

app.use("/api", apiRouter);

app.use("/stats", (req, res) => {
  res.send(
    `<h1>App is Up!</h1>
      <dl><dt>Working Directory</dt><dd>${cwd}</dd>
      <dt>Frontend dist</dt><dd>${dist}</dd>
      <dt>HTML served</dt><dd>${indexHtml}</dd></dl>
    `
  );
});

// SPA route; always returns index.html
app.use("/app", (req, res) => {
  if (!indexHtml) {
    res
      .status(404)
      .send(
        `Not found; ${frontend} not available, running in ${cwd}`
      );
  } else {
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
      res.send(html)
    );
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
