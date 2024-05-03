import express, { Request, Response } from "express";
<<<<<<< HEAD:packages/express-backend/src/routes/profiles.ts
import { Profile } from "ts-models";
import profiles from "../services/profiles";

const router = express.Router();

=======
import { Profile } from "../models/profile";
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

>>>>>>> mod-4:packages/server/src/routes/profiles.ts
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
});

=======
>>>>>>> mod-4:packages/server/src/routes/profiles.ts
export default router;
