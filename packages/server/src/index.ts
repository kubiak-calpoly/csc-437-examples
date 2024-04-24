import express, { Request, Response } from "express";
import profiles from "./routes/profiles";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// Middleware:
app.use(express.static(staticDir));
app.use(express.json());

// API Routes:
app.use("/api/profiles", profiles);

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
