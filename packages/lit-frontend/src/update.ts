import {
  APIRequest,
  Dispatch,
  JSONRequest,
  updateProps,
  noUpdate
} from "@calpoly/mustang";
import { convertStartEndDates } from "./utils/dates";
import { Model } from "./model";
import { Message } from "./messages";
import * as Msg from "./messages";
import {
  ChatMessage,
  Tour,
  Profile,
  Destination,
  Route
} from "ts-models";

const dispatch = new Dispatch<Model, Message>();

export default dispatch.update;

dispatch.addMessage(
  "UserLoggedIn",
  (msg: Message, model: Model) => {
    const { user } = msg as Msg.UserLoggedIn;

    return updateProps<Model>({ user })(model);
  }
);

dispatch.addMessage("TourSelected", (msg: Message) => {
  const { tourId } = msg as Msg.TourSelected;

  return new APIRequest()
    .get(`/tours/${tourId}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Tour:", json);
        let tour: Tour = convertStartEndDates<Tour>(json);
        tour.destinations = tour.destinations.map(
          convertStartEndDates<Destination>
        );
        return tour;
      }
    })
    .then((tour: Tour | undefined) =>
      tour ? updateProps<Model>({ tour }) : noUpdate<Model>
    );
});

dispatch.addMessage("ProfileSelected", (msg: Message) => {
  const { userid } = msg as Msg.ProfileSelected;

  return new APIRequest()
    .get(`/profiles/${userid}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    })
    .then((profile: Profile | undefined) =>
      profile
        ? updateProps<Model>({ profile })
        : noUpdate<Model>
    );
});

dispatch.addMessage("ProfileSaved", (msg: Message) => {
  const { userid, profile } = msg as Msg.ProfileSaved;

  return new JSONRequest(profile)
    .put(`/profiles/${userid}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        json as Profile;
      }
      return undefined;
    })
    .then((profile: Profile | undefined) =>
      profile
        ? updateProps<Model>({ profile })
        : noUpdate<Model>
    );
});

dispatch.addMessage("DestinationSaved", (msg: Message) => {
  const { tourId, destId, destination } =
    msg as Msg.DestinationSaved;

  return new JSONRequest(destination)
    .put(`/tours/${tourId}/destinations/${destId}`)
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Destination:", destination);
        return convertStartEndDates<Destination>(
          json
        ) as Destination;
      }
      return undefined;
    })
    .then((dest: Destination | undefined) => {
      if (dest) {
        return (model: Model) => {
          const tour = model.tour;
          const destinations = tour?.destinations.map((d, i) =>
            i === destId ? dest : d
          );
          return Object.assign({}, model, {
            tour: Object.assign({}, tour, { destinations })
          });
        };
      } else {
        return noUpdate<Model>;
      }
    });
});

dispatch.addMessage("RouteRequested", (msg: Message) => {
  const { points } = msg as Msg.RouteRequested;
  const coordinates = points
    .map((pt) => `${pt.lon},${pt.lat}`)
    .join(";");

  console.log("Requesting route for points:", coordinates);

  return new APIRequest()
    .get(`/directions?pts=${coordinates}`)
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Route;
      else return undefined;
    })
    .then((route: Route | undefined) =>
      route ? updateProps<Model>({ route }) : noUpdate<Model>
    );
});
