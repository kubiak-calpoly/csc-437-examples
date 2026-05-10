import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import credentials from "../services/credential-svc";
const router = express.Router();
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "NOT_A_SECRET";
function generateAccessToken(username) {
    console.log("Generating token for", username);
    return new Promise((resolve, reject) => {
        jwt.sign({ username: username }, TOKEN_SECRET, { expiresIn: "1d" }, (error, token) => {
            if (error)
                reject(error);
            else {
                console.log("Token is", token);
                resolve(token);
            }
        });
    });
}
router.post("/register", (req, res) => {
    const { username, password } = req.body; // from form
    if (!username || !password) {
        res.status(400).send("Bad request: Invalid input data.");
    }
    else {
        credentials
            .create(username, password)
            .then((creds) => generateAccessToken(creds.username))
            .then((token) => {
            res.status(201).send({ token: token });
        });
    }
});
router.post("/login", (req, res) => {
    const { username, password } = req.body; // from form
    if (!username || !password) {
        res.status(400).send("Bad request: Invalid input data.");
    }
    else {
        credentials
            .verify(username, password)
            .then((goodUser) => generateAccessToken(goodUser))
            .then((token) => res.status(200).send({ token: token }))
            .catch((error) => res.status(401).send("Unauthorized"));
    }
});
export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).end();
    }
    else {
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                next();
            }
            else {
                res.status(401).end();
            }
        });
    }
}
export default router;
