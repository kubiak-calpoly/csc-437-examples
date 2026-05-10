import express from "express";
import profiles from "../services/profile-svc";
const router = express.Router();
router.get("/", (_, res) => {
    profiles
        .index()
        .then((list) => res.json(list))
        .catch((err) => res.status(500).send(err));
});
router.get("/:userid", (req, res) => {
    const { userid } = req.params;
    profiles
        .get(userid)
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).send(err));
});
router.put("/:userid", (req, res) => {
    const { userid } = req.params;
    const editedProfile = req.body;
    profiles
        .update(userid, editedProfile)
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
    const newProfile = req.body;
    profiles
        .create(newProfile)
        .then((profile) => res.status(201).send(profile))
        .catch((err) => res.status(500).send(err));
});
router.delete("/:userid", (req, res) => {
    const { userid } = req.params;
    profiles
        .remove(userid)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});
export default router;
