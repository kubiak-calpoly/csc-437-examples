import express, {
  NextFunction,
  Request,
  Response
} from "express";
// import "express-async-errors";
import { Eta } from "eta";
import { Tour } from "../models/Tour";
import { Profile } from "../models/Profile";
import { tour_service, profile_service } from "./services";
import { connect } from "./services";
import api from "./api";
import errorHandler from "./utils/errorHandler";
import {
  NotFoundError,
  InternalError
} from "../utils/HTTPError";

const app = express();
const eta = new Eta({
  views: "./views"
});
const port = process.env.PORT || 3000;

// HTTP error handling

// app.use(errorHandler);

// Static files served

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

// API served

connect("blazing");

app.use("/api", api);

// Pages served

app.get("/hello/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(eta.render("./hello", { name }));
});

app.get("/tour/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  tour_service
    .get(id)
    .then((data: Tour) => res.send(eta.render("./tour", data)));
});

app.get("/profile/new", (req: Request, res: Response) => {
  res.send(
    eta.render("./profile", {
      $new: true
    })
  );
});

app.get(
  "/profile/show/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    profile_service
      .get(id)
      .then((data) => {
        console.log(
          "Data for /profile: ",
          JSON.stringify(data)
        );
        res.send(eta.render("./profile", data));
      })
      .catch((error) => next(error));
  }
);

app.get("/profile/edit/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  profile_service.get(id).then((old: Profile) => {
    res.send(eta.render("./profile", { $edit: true, ...old }));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
