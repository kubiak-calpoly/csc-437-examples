import { Request, Response, Router } from "express";
import { Profile } from "../../models/Profile";
import { profile_service } from "../services";

const api = Router();

api.post("/", (req: Request, res: Response) => {
  console.log("Received a profile:", req.body);
  profile_service
    .create(req.body as Profile)
    .then((profile) => res.status(201).send(profile))
    .catch((error) => res.status(400).send({ error }));
});

export default api;
