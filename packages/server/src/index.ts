import express, { Request, Response } from "express";
import {
  DestinationPage,
  TravelerPage,
  renderPage
} from "./pages/index";
import tours from "./routes/tours";
import travelers from "./routes/travelers";
import { connect } from "./services/mongo";
import Tours from "./services/tour-svc";
import Travelers from "./services/traveler-svc";

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

app.get("/traveler/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Travelers.get(userid).then((data) => {
    const page = new TravelerPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});

app.get(
  "/destination/:tourId/:destIndex",
  (req: Request, res: Response) => {
    const { tourId, destIndex } = req.params;
    const di = parseInt(destIndex);

    Tours.get(tourId)
      .then((tour) => {
        const dest = tour.destinations[di];

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
        const page = new DestinationPage(data);

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
