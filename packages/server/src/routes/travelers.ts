import express, { Request, Response } from "express";
import { Traveler } from "../models";

import Travelers from "../services/traveler-svc.ts";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Travelers.index()
    .then((list: Traveler[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Travelers.get(userid)
    .then((traveler: Traveler | undefined) => {
      if ( traveler ) res.send(traveler)
      else res.status(404).send(`Not found traveler ${userid}`);
    })
});

router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const editedTraveler = req.body;

  Travelers.update(userid, editedTraveler)
    .then((traveler: Traveler | undefined) => {
      if ( traveler ) res.send(traveler)
      else res.status(404).send(`Not found traveler ${userid}`);
    })
});

router.post("/", (req: Request, res: Response) => {
  const newTraveler = req.body;

  Travelers.create(newTraveler)
    .then((traveler: Traveler) =>
      res.status(201).send(traveler)
    )
    .catch((err) => res.status(500).send(err));
});

router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Travelers.remove(userid)
    .then((deleted) => {
      if (deleted) res.status(204).end()
      else res.status(404).end()
    } )
    .catch((err) => res.status(404).send(err));
});

export default router;
