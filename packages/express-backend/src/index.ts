import express, { Request, Response } from "express";
import * as path from "path";
import fs from "node:fs/promises";
import cors from "cors";
import { connect } from "./mongoConnect";
import { loginUser, registerUser } from "./auth";
import apiRouter from "./routes/api";

const app = express();
const port = process.env.PORT || 3000;

let dist: string | undefined;
let frontend: string | undefined;

try {
  frontend = require.resolve("lit-frontend");
  dist = path.resolve(frontend, "..", "..");
  console.log("Serving lit-frontend from", dist);
} catch (error: any) {
  console.log(
    "Cannot find static assets in lit-frontend",
    error.code
  );
}

connect("blazing");

if (dist) app.use(express.static(dist));
app.use(express.json({ limit: "500kb" }));
app.use(cors());

app.options("*", cors());

app.post("/login", loginUser);
app.post("/signup", registerUser);

app.use("/api", apiRouter);

// SPA routes ignore parameters when locating index.html
app.use("/:spa(app)", (req, res) => {
  const { spa } = req.params;

  if (!dist) {
    res
      .status(404)
      .send("Not found; frontend module not loaded");
  } else {
    const indexHtml = path.resolve(dist, spa, "index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
      res.send(html)
    );
    console.log("Sent SPA from", indexHtml);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
