import express from "express";
import entourages from "../services/entourage-svc.js";
const router = express.Router();
router.post("/", (req, res) => {
    const newEntourage = req.body;
    entourages
        .create(newEntourage)
        .then((profile) => res.status(201).send(profile))
        .catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    entourages
        .get(id)
        .then((profile) => {
        if (!profile)
            throw "Not found";
        else
            res.json(profile);
    })
        .catch((err) => res.status(404).end());
});
router.put("/:userid", (req, res) => {
    const { userid } = req.params;
    const newEntourage = req.body;
    entourages
        .update(userid, newEntourage)
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).end());
});
export default router;
