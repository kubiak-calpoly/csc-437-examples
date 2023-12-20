import express, { Request, Response } from "express";
import { Eta } from "eta";
import { Tour } from "./models/Tour";
import { Profile } from "./models/Profile";
import tours from "./services/tours";
import profiles from "./services/profiles";
import { connect } from "./services";
import {
  basicAuth,
  authenticatedUser
} from "./auth/basic-auth";
import api from "./api";

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

connect("blazing");

app.use("/api", api);

app.get("/hello/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(eta.render("./hello", { name }));
});

app.get("/tour/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  tours
    .get(id)
    .then((data: Tour) => res.send(eta.render("./tour", data)));
});

app.get(
  "/profile/new",
  basicAuth,
  (req: Request, res: Response) => {
    res.send(
      eta.render("./profile", {
        $new: true,
        $user: authenticatedUser(req)
      })
    );
  }
);

app.get(
  "/profile/show/:id",
  basicAuth,
  (req: Request, res: Response) => {
    const { id } = req.params;
    profiles.get(id).then((data: Profile) => {
      console.log("Data for /profile: ", JSON.stringify(data));
      res.send(eta.render("./profile", data));
    });
  }
);

app.get(
  "/profile/edit/:id",
  basicAuth,
  (req: Request, res: Response) => {
    const { id } = req.params;
    profiles.get(id).then((old: Profile) => {
      res.send(
        eta.render("./profile", { $edit: true, ...old })
      );
    });
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
