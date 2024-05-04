import express, { Request, Response } from "express";
import { Profile } from "../models/profile";

import profiles from "../services/profile-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  profiles
    .index()
    .then((list: Profile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .get(userid)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).send(err));
});

router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const editedProfile = req.body;

  profiles
    .update(userid, editedProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
