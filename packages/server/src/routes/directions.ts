import express, { Request, Response } from "express";
import { Route } from "ts-models";
import { getDirections } from "../services/mapbox";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { pts } = req.query;
  const points = (pts as String)
    .split(";")
    .map((pair) => pair.split(",").map((n) => parseFloat(n)));

  getDirections(points as [number, number][])
    .then((route: Route | undefined) => {
      if (!route) throw "Not found";
      else res.json(route);
    })
    .catch((error: any) => res.status(500).send(error));
});

export default router;
