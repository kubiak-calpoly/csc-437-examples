import express, { Request, Response } from "express";
import { Entourage } from "../models";
import entourages from "../services/entourage-svc";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const newEntourage = req.body;

  entourages
    .create(newEntourage)
    .then((profile: Entourage) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  entourages
    .get(id)
    .then((profile: Entourage | undefined) => {
      if (!profile) throw "Not found";
      else res.json(profile);
    })
    .catch((err) => res.status(404).end());
});

router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newEntourage = req.body;

  entourages
    .update(userid, newEntourage)
    .then((profile: Entourage) => res.json(profile))
    .catch((err) => res.status(404).end());
});

export default router;
