import { APIRequest, JSONRequest } from "./rest";
import * as App from "./app";
import { convertStartEndDates } from "./utils/dates";
import {
  ChatMessage,
  Tour,
  Profile,
  Destination,
  Route
} from "ts-models";

const dispatch = App.createDispatch();
export default dispatch.update;

dispatch.addMessage(
  "UserLoggedIn",
  (msg: App.Message, model: App.Model) => {
    const { user } = msg as App.UserLoggedIn;

    return App.updateProps({ user })(model);
  }
);

dispatch.addMessage("TourSelected", (msg: App.Message) => {
  const { tourId } = msg as App.TourSelected;

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
      tour ? App.updateProps({ tour }) : App.noUpdate
    );
});

dispatch.addMessage("ProfileSelected", (msg: App.Message) => {
  const { userid } = msg as App.ProfileSelected;

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
      profile ? App.updateProps({ profile }) : App.noUpdate
    );
});

dispatch.addMessage("ProfileSaved", (msg: App.Message) => {
  const { userid, profile } = msg as App.ProfileSaved;

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
      profile ? App.updateProps({ profile }) : App.noUpdate
    );
});

dispatch.addMessage("DestinationSaved", (msg: App.Message) => {
  const { tourId, destId, destination } =
    msg as App.DestinationSaved;

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
        return json as Destination;
      }
      return undefined;
    })
    .then((dest: Destination | undefined) => {
      if (dest) {
        return (model: App.Model) => {
          const tour = model.tour;
          const destinations = tour?.destinations.map((d, i) =>
            i === destId ? dest : d
          );
          return Object.assign({}, model, {
            tour: Object.assign({}, tour, { destinations })
          });
        };
      } else {
        return App.noUpdate;
      }
    });
});

dispatch.addMessage("RouteRequested", (msg: App.Message) => {
  const { points } = msg as App.RouteRequested;
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
      route ? App.updateProps({ route }) : App.noUpdate
    );
});
