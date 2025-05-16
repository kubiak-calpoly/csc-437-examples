import express, { Request, Response } from "express";
import { Destination, Tour } from "../models";
import tours from "../services/tour-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  tours
    .index()
    .then((list: Tour[]) =>
      res.status(200).send({
        count: list.length,
        data: list
      })
    )
    .catch((err) => res.status(500).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newTour = req.body;

  tours
    .create(newTour)
    .then((tour: Tour) => res.status(201).send(tour))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  tours
    .get(id)
    .then((tour: Tour | undefined) => {
      if (!tour) throw "Not found";
      else res.json(tour);
    })
    .catch(() => res.status(404).end());
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newTour = req.body;

  tours
    .update(id, newTour)
    .then((tour: Tour) => res.json(tour))
    .catch(() => res.status(404).end());
});

router.get(
  "/:id/destinations/:n",
  (req: Request, res: Response) => {
    const { id, n } = req.params;

    tours
      .getDestination(id, parseInt(n))
      .then((destination: Destination) =>
        res.status(200).json(destination))
      .catch(() => res.status(404).end());
  });

router.put(
  "/:id/destinations/:n",
  (req: Request, res: Response) => {
    const { id, n } = req.params;
    const newDest = req.body;

    console.log(
      `Updating Destination ${n} of tour ${id} with`,
      newDest
    );

    tours
      .updateDestination(id, parseInt(n), newDest)
      .then((dest: Destination) => res.json(dest))
      .catch(() => res.status(404).end());
  }
);

export default router;
