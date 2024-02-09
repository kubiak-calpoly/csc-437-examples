import express, { Request, Response } from "express";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import profileView from "./views/profileView";
import pageTemplate from "./templates/pageTemplate";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

connect("blazing");

app.get("/profile/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .get(userid)
    .then((profile) =>
      res
        .set("Content-Type", "text/html")
        .send(pageTemplate({ body: profileView(profile) }))
    )
    .catch((err) => res.status(404).end());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
