import express from "express";
import auth, { authenticateUser } from "./routes/auth.js";
import tours from "./routes/tours.js";
import travelers from "./routes/travelers.js";
import { connect } from "./services/mongo.js";
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
// Auth Routes:
app.use("/auth", auth);
// API Routes:
app.use("/api/travelers", authenticateUser, travelers);
app.use("/api/tours", authenticateUser, tours);
// HTML Routes:
app.get("/hello", (_, res) => {
    res.send(`<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `);
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at
  http://localhost:${port}`);
});
