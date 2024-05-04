import express, { Request, Response } from "express";
import { Profile } from "../models/profile";
<<<<<<< HEAD:packages/express-backend/src/routes/profiles.ts
import profiles from "../services/profiles";

const router = express.Router();

=======
import profiles from "../services/profile-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
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

>>>>>>> mod-5:packages/server/src/routes/profiles.ts
router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

<<<<<<< HEAD:packages/express-backend/src/routes/profiles.ts
router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .get(userid)
    .then((profile: Profile | undefined) => {
      if (!profile) throw "Not found";
      else res.json(profile);
    })
    .catch((err) => res.status(404).end());
});

router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newProfile = req.body;

  profiles
    .update(userid, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
=======
router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
>>>>>>> mod-5:packages/server/src/routes/profiles.ts
});

export default router;
