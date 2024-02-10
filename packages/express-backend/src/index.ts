import express, { Request, Response } from "express";
import * as path from "path";
import cors from "cors";
import { connect } from "./mongoConnect";
import { loginUser, registerUser } from "./auth";
import apiRouter from "./routes/api";

const app = express();
const port = process.env.PORT || 3000;

let dist;

try {
  const frontend = require.resolve("lit-frontend");
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
