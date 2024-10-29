import express, { Request, Response } from "express";
import { Destination } from "./models";
import { DestinationPage } from "./pages";
import { connect } from "./services/mongo";
import Tours from "./services/tour-svc";

const app = express();
const port = process.env.PORT || 3000;

// Mongo Connection
connect("blazing");

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

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
      const page = new DestinationPage(data);

      res.set("Content-Type", "text/html").send(page.render());
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
