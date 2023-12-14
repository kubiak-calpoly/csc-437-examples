import express, { Request, Response } from "express";
import { Eta } from "eta";

const app = express();
const eta = new Eta({
  views: "./views"
});
const port = process.env.PORT || 3000;

app.get("/hello/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(eta.render("./hello", { name }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
