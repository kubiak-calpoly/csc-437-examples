import express, { Request, Response } from "express";
import { Destination, Tour } from "../models";
import tours from "../services/tour-svc.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { userid } = req.query as { userid: string };
  if (!userid) {
    res.status(400).send("requires ?userid=");
    return;
  }
  tours
    .index(userid)
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



export default router;
