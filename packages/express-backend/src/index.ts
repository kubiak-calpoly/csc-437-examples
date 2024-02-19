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
let dist: PathLike | undefined;
let indexHtml: PathLike | undefined;

try {
  indexHtml = require.resolve(frontend);
  dist = path.dirname(indexHtml);
  console.log(`Serving ${frontend} from`, dist);
} catch (error: any) {
  console.log(`Not serving ${frontend}:`, error.code);
}

if (dist) app.use(express.static(dist.toString()));

app.use(express.json({ limit: "500kb" }));
app.use(cors());

app.options("*", cors());

app.post("/login", loginUser);
app.post("/signup", registerUser);

app.use("/api", apiRouter);

// SPA route; always returns index.html
app.use("/app", (req, res) => {
  if (!indexHtml) {
    res
      .status(404)
      .send(`Not found; ${frontend} not available`);
  } else {
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
      res.send(html)
    );
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
