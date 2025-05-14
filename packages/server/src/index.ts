import express, { Request, Response } from "express";
import auth, { authenticateUser } from "./routes/auth";
import tours from "./routes/tours";
import travelers from "./routes/travelers";
import { getFile, saveFile } from "./services/filesystem";
import { connect } from "./services/mongo";
import Tours from "./services/tour-svc";
import Travelers from "./services/traveler-svc";

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


// Page Routes:
app.get("/ping", (_: Request, res: Response) => {
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
