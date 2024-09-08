import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import {
  DestinationPage,
  LoginPage,
  RegistrationPage,
  renderPage
} from "./pages/index";
import auth, { authenticateUser } from "./routes/auth";
import tours from "./routes/tours";
import travelers from "./routes/travelers";
import { getFile, saveFile } from "./services/filesystem";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;

// Mongo Connection
connect("blazing");

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Middleware:
app.use(express.json());

// Auth routes
app.use("/auth", auth);

// API Routes:
app.use("/api/travelers", authenticateUser, travelers);
app.use("/api/tours", authenticateUser, tours);

// Images routes
app.post("/images", saveFile);
app.get("/images/:id", getFile);

// HTML Routes:
app.get("/ping", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

app.get("/login", (req: Request, res: Response) => {
  res
    .set("Content-Type", "text/html")
    .send(renderPage(LoginPage.render()));
});

app.get("/register", (req: Request, res: Response) => {
  res
    .set("Content-Type", "text/html")
    .send(renderPage(RegistrationPage.render()));
});

// SPA Routes: /app/...
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
