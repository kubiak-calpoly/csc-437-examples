import express, { Request, Response } from "express";
import { getDestination } from "./mockdata";
import { DestinationPage } from "./pages";

const app = express();
const port = process.env.PORT || 3000;

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
  "/destination/:destId",
  (req: Request, res: Response) => {
    const { destId } = req.params;
    const data = getDestination(destId);

    res
      .set("Content-Type", "text/html")
      .send(DestinationPage.render(data));
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
