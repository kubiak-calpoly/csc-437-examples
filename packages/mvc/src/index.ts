import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/hello/:user", (req: Request, res: Response) => {
  const { user } = req.params;
  res.send(`Hello there, ${user}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
