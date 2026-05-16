import express from "express";
import Travelers from "../services/traveler-svc.js";
const router = express.Router();
router.get("/", (_, res) => {
    Travelers.index()
        .then((list) => res.json(list))
        .catch((err) => res.status(500).send(err));
});
router.get("/:userid", (req, res) => {
    const { userid } = req.params;
    Travelers.get(userid)
        .then((traveler) => {
        if (traveler)
            res.send(traveler);
        else
            res.status(404).send(`Not found traveler ${userid}`);
    });
});
router.put("/:userid", (req, res) => {
    const { userid } = req.params;
    const editedTraveler = req.body;
    Travelers.update(userid, editedTraveler)
        .then((traveler) => {
        if (traveler)
            res.send(traveler);
        else
            res.status(404).send(`Not found traveler ${userid}`);
    });
});
router.post("/", (req, res) => {
    const newTraveler = req.body;
    Travelers.create(newTraveler)
        .then((traveler) => res.status(201).send(traveler))
        .catch((err) => res.status(500).send(err));
});
router.delete("/:userid", (req, res) => {
    const { userid } = req.params;
    Travelers.remove(userid)
        .then((deleted) => {
        if (deleted)
            res.status(204).end();
        else
            res.status(404).end();
    })
        .catch((err) => res.status(404).send(err));
});
export default router;
