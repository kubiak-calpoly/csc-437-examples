import express, { Request, Response } from "express";
import { Destination, Tour } from "../models";
import destinations from "../services/destination-svc.ts";

const router = express.Router();

router.get("/:tourId/:destIndex", (req: Request, res: Response) => {
  const {tourId, destIndex} = req.params;

  destinations
    .get(tourId, Number.parseInt(destIndex))
    .then((destination: Destination | undefined) => {
      if (!destination) throw "Not found";
      else res.json(destination);
    })
    .catch((err) => res.status(404).send(err));
});

router.put(
  "/:tourId/:destIndex",
  (req: Request, res: Response) => {
    const { tourId, destIndex } = req.params;
    const newDest = req.body;

    destinations
      .update(tourId, Number.parseInt(destIndex), newDest)
      .then((dest: Destination) => res.json(dest))
      .catch(() => res.status(404).end());
  }
);

export default router;
