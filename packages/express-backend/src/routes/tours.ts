import express, { Request, Response } from "express";
import { Tour } from "ts-models";
import tours from "../services/tours";

const router = express.Router();

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
    .catch((err) =>
      res.status(404).end(`Tour ${id} not found.`)
    );
});

router.put("/:id", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newTour = req.body;

  tours
    .update(userid, newTour)
    .then((tour: Tour) => res.json(tour))
    .catch((err) => res.status(404).end());
});

export default router;
