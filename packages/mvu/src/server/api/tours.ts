import { Request, Response, Router } from "express";
import { Tour } from "../../models/Tour";
import { tour_service } from "../services";

const api = Router();

api.post("/", (req: Request, res: Response) => {
  console.log("Received a tour:", req.body);
  tour_service
    .create(req.body as Tour)
    .then((tour) => res.status(200).send(tour))
    .catch((error) => res.status(400).send({ error }));
});

export default api;
