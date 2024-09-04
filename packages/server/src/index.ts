import express, { Request, Response } from "express";
import {
  DestinationPage,
  LoginPage,
  RegistrationPage,
  renderPage
} from "./pages/index";
import auth, { authenticateUser } from "./routes/auth";
import tours from "./routes/tours";
import travelers from "./routes/travelers";
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

app.get("/register", (req: Request, res: Response) => { });

app.get(
  "/destination/:tourId/:destIndex",
  (req: Request, res: Response) => {
    const { tourId, destIndex } = req.params;

    res
      .set("Content-Type", "text/html")
      .send(
        renderPage(
          DestinationPage.render(tourId, parseInt(destIndex))
        )
      );
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
