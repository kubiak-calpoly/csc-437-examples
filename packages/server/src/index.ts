import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import {
  DestinationPage,
  LoginPage,
  RegistrationPage,
  TravelerPage
} from "./pages/index";
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
app.use(express.raw({ type: "image/*", limit: "32Mb" }));
app.use(express.json());

// Auth routes
app.use("/auth", auth);

// API Routes:
app.use("/api/travelers", authenticateUser, travelers);
app.use("/api/tours", authenticateUser, tours);

// Image routes
app.post("/images", saveFile);
app.get("/images/:id", getFile);

// Page Routes:
app.get("/ping", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/register", (req: Request, res: Response) => {
  const page = new RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/traveler/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const mode =
    req.query["new"] !== undefined
      ? "new"
      : req.query.edit !== undefined
        ? "edit"
        : "view";

  if (mode === "new") {
    const page = new TravelerPage(null, mode);
    res.set("Content-Type", "text/html").send(page.render());
  } else {
    Travelers.get(userid)
      .then((data) => {
        if (!data) throw `Not found: ${userid}`;
        const page = new TravelerPage(data, mode);
        res
          .set("Content-Type", "text/html")
          .send(page.render());
      })
      .catch((error) => {
        console.log(error);
        res.status(404).end();
      });
  }
});

// SPA Routes: /app/...
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.get(
  "/destination/:tourId/:destIndex",
  (req: Request, res: Response) => {
    const { tourId, destIndex } = req.params;
    const di = parseInt(destIndex);
    const mode = req.query.edit
      ? "edit"
      : req.query.new
        ? "new"
        : "view";

    Tours.get(tourId)
      .then((tour) => {
        const dest = tour.destinations[di].toObject();

        // reshape destination and tour data for page
        return {
          ...dest,
          tour: {
            name: tour.name
          },
          inbound: tour.transportation[di],
          outbound: tour.transportation[di + 1]
        };
      })
      .then((data) => {
        const page = new DestinationPage(data, mode);

        res
          .set("Content-Type", "text/html")
          .send(page.render());
      });
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
