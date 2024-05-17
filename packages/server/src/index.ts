import express, { Request, Response } from "express";
import path from "path";
import auth, { authenticateUser } from "./routes/auth";
import profiles from "./routes/profiles";
import tours from "./routes/tours";
import { connect } from "./services/mongo";

// Mongo Connection
connect("blazing");

const app = express();
const port = process.env.PORT || 3000;

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Middleware:
app.use(express.json());

// Auth routes
app.use("/auth", auth);

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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
