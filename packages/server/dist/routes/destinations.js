import express from "express";
import destinations from "../services/destination-svc.js";
const router = express.Router();
router.get("/:tourId/:destIndex", (req, res) => {
    const { tourId, destIndex } = req.params;
    destinations
        .get(tourId, Number.parseInt(destIndex))
        .then((destination) => {
        if (!destination)
            throw "Not found";
        else
            res.json(destination);
    })
        .catch((err) => res.status(404).send(err));
});
router.put("/:tourId/:destIndex", (req, res) => {
    const { tourId, destIndex } = req.params;
    const newDest = req.body;
    destinations
        .update(tourId, Number.parseInt(destIndex), newDest)
        .then((dest) => res.json(dest))
        .catch(() => res.status(404).end());
});
export default router;
