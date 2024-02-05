import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import { Profile } from "./models/profile";
import profiles from "./profiles";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connect("blazing");

app.post("/api/profiles", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

app.get(
  "/api/profiles/:userid",
  (req: Request, res: Response) => {
    const { userid } = req.params;

    profiles
      .get(userid)
      .then((profile: Profile) => res.json(profile))
      .catch((err) => res.status(404).end());
  }
);

app.put(
  "/api/profiles/:userid",
  (req: Request, res: Response) => {
    const { userid } = req.params;
    const newProfile = req.body;

    profiles
      .update(userid, newProfile)
      .then((profile: Profile) => res.json(profile))
      .catch((err) => res.status(404).end());
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
