import {
  NextFunction,
  Request,
  Response,
  Router
} from "express";
import { Tour } from "../../models/Tour";
import { tour_service } from "../services";

const api = Router();

api.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    tour_service
      .get(id)
      .then((tour) => res.status(200).send(tour))
      .catch((error) => next(error));
  }
);

api.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    tour_service
      .create(req.body as Tour)
      .then((tour) => res.status(201).send(tour))
      .catch((error) => next(error));
  }
);

export default api;
