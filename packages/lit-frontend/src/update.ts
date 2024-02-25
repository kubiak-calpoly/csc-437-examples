import { APIRequest, JSONRequest } from "./rest";
import * as App from "./app";
import { convertStartEndDates } from "./utils/dates";
import { Tour, Profile, Destination } from "ts-models";

const dispatch = App.createDispatch();
export default dispatch.update;

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
        json as Destination;
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
