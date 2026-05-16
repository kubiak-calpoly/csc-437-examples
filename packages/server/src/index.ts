import express, { Request, Response } from "express";
import auth, { authenticateUser } from "./routes/auth.ts";
import tours from "./routes/tours.ts";
import travelers from "./routes/travelers.ts";
import destinations from "./routes/destinations.ts";
import { getFile, saveFile } from "./services/filesystem.ts";

import { connect } from "./services/mongo.ts";

const app = express();
const port = process.env.PORT || 3000;

// Mongo Connection67
connect("blazing");

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Middleware:
app.use(express.json());
app.use(express.raw({ type: "image/*", limit: "32Mb" }));

// Auth Routes:
app.use("/auth", auth);

// API Routes:
app.use("/api/travelers", authenticateUser, travelers);
app.use("/api/tours", authenticateUser, tours);
app.use("/api/destinations", authenticateUser, destinations);

// Image Routes:
app.post("/images", authenticateUser, saveFile);
app.get("/images/:id", getFile);

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
  console.log(`Server running at
  http://localhost:${port}`);
});
