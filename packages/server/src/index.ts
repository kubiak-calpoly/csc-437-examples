import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import auth, { authenticateUser } from "./routes/auth";
import profiles from "./routes/profiles";
import tours from "./routes/tours";
import { getFile, saveFile } from "./services/filesystem";
import { connect } from "./services/mongo";
import websockets from "./services/websockets";

// Mongo Connection
connect("blazing");

const app = express();
const port = process.env.PORT || 3000;

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Middleware:
app.use(express.raw({ type: "image/*", limit: "32Mb" }));
app.use(express.json({ limit: "500kb" }));

// Auth routes
app.use("/auth", auth);

// Images routes
app.post("/images", saveFile);
app.get("/images/:id", getFile);

// NPM Packages
const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

// API Routes:
app.use("/api/profiles", authenticateUser, profiles);
app.use("/api/tours", authenticateUser, tours);

// HTML Routes:
app.get("/hello", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

// SPA Routes: /app/...
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

websockets(server);
