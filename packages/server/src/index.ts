import express, { Request, Response } from "express";
import { Destination } from "./models";
import { DestinationPage, renderPage } from "./pages/index";
import { connect } from "./services/mongo";
import Tours from "./services/tour-svc";
import travelers from "./routes/travelers";
import tours from "./routes/tours";

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

app.get(
  "/destination/:tourId/:destIndex",
  (req: Request, res: Response) => {
    const { tourId, destIndex } = req.params;

    getDestination(tourId, parseInt(destIndex)).then((data) => {
      // console.log("data to render:", JSON.stringify(data));

      res
        .set("Content-Type", "text/html")
        .send(renderPage(DestinationPage.render(data)));
    });
  }
);

// const TOUR_OID = "65c7e92ea837ff7c15b669e5";

function getDestination(tourId: string, destIndex: number) {
  return Tours.get(tourId).then((tour) => {
    const dest = tour.destinations[destIndex].toObject();

    return {
      ...dest,
      tour: {
        name: tour.name
      },
      inbound: tour.transportation[destIndex].toObject(),
      outbound: tour.transportation[destIndex + 1].toObject()
    };
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
