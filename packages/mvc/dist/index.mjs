import express from "express";
import { Eta } from "eta";
import tours from "./services/tours.mts";
const app = express();
const eta = new Eta({
    views: "./views"
});
const port = process.env.PORT || 3000;
[
    "data",
    "icons",
    "js",
    "images",
    "maps",
    "pages",
    "styles"
].forEach((dir) => app.use(`/${dir}`, express.static(`static/${dir}`)));
app.get("/hello/:name", (req, res) => {
    const { name } = req.params;
    res.send(eta.render("./hello", { name }));
});
app.get("/tours/:id", (req, res) => {
    const { id } = req.params;
    tours
        .get(id)
        .then((data) => res.send(eta.render("./tour", data)));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
