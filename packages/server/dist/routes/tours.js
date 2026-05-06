import express from "express";
import tours from "../services/tour-svc.js";
const router = express.Router();
router.get("/", (req, res) => {
    tours
        .index()
        .then((list) => res.status(200).send({
        count: list.length,
        data: list
    }))
        .catch((err) => res.status(500).send(err));
});
router.post("/", (req, res) => {
    const newTour = req.body;
    tours
        .create(newTour)
        .then((tour) => res.status(201).send(tour))
        .catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    tours
        .get(id)
        .then((tour) => {
        if (!tour)
            throw "Not found";
        else
            res.json(tour);
    })
        .catch(() => res.status(404).end());
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const newTour = req.body;
    tours
        .update(id, newTour)
        .then((tour) => res.json(tour))
        .catch(() => res.status(404).end());
});
router.put("/:id/destinations/:n", (req, res) => {
    const { id, n } = req.params;
    const newDest = req.body;
    console.log(`Updating Destination ${n} of tour ${id} with`, newDest);
    tours
        .updateDestination(id, parseInt(n), newDest)
        .then((dest) => res.json(dest))
        .catch(() => res.status(404).end());
});
export default router;
