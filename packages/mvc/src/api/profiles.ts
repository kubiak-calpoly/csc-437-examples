import { Request, Response, Router } from "express";
import profiles from "../services/profiles";

const api = Router();

api.post("/", (req: Request, res: Response) => {
  console.log("Received a profile:", req.body);
  const { id, name, nickname, home, airports, avatar, color } =
    req.body;
  profiles
    .create({
      id,
      name,
      nickname,
      home,
      airports,
      avatar,
      color
    })
    .then((profile) => res.status(200).send(profile))
    .catch((error) => res.status(400).send({ error }));
});

export default api;
