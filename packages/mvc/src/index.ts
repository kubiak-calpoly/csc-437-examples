import express, { Request, Response } from "express";
import { Eta } from "eta";

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
].forEach((dir) =>
  app.use(`/${dir}`, express.static(`static/${dir}`))
);

app.get("/hello/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(eta.render("./hello", { name }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
