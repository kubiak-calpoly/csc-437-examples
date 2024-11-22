import express, { Request, Response } from "express";
import { Traveler } from "../models/traveler";
import { authenticateUser } from "./auth";

import travelers from "../services/traveler-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  travelers
    .index()
    .then((list: Traveler[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  travelers
    .get(userid)
    .then((traveler: Traveler) => res.json(traveler))
    .catch((err) => res.status(404).send(err));
});

router.put(
  "/:userid",
  authenticateUser,
  (req: Request, res: Response) => {
    const { userid } = req.params;
    const editedTraveler = req.body;

    travelers
      .update(userid, editedTraveler)
      .then((traveler: Traveler) => res.json(traveler))
      .catch((err) => res.status(404).send(err));
  }
);

router.post("/", (req: Request, res: Response) => {
  const newTraveler = req.body;

  travelers
    .create(newTraveler)
    .then((traveler: Traveler) =>
      res.status(201).send(traveler)
    )
    .catch((err) => res.status(500).send(err));
});

router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  travelers
    .remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
