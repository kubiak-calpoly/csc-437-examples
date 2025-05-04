import express, { Request, Response } from "express";
import tours from "./routes/tours";
import travelers from "./routes/travelers";
import { connect } from "./services/mongo";

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

// API Routes:
app.use("/api/travelers", travelers);
app.use("/api/tours", tours);

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
