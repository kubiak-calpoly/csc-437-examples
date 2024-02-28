import { LineString } from "geojson";
import { LngLatLike } from "mapbox-gl";
import { Point, Route, RouteLeg } from "ts-models";

const ACCESS_TOKEN =
  process.env.MAPBOX_ACCESS_TOKEN || "MISSING_TOKEN";

const MAPBOX_API = "https://api.mapbox.com";

interface DirectionsResponse {
  code: string;
  routes: Route[];
}

export function getDirections(
  pts: [number, number][]
): Promise<Route> {
  const coords = pts
    .map(([lon, lat]) => `${lon},${lat}`)
    .join(";");
  const query = `geometries=geojson&access_token=${ACCESS_TOKEN}`;

  console.log("Querying mapbox for directions:", coords, query);
  return fetch(
    `${MAPBOX_API}/directions/v5/mapbox/driving/${coords}?${query}`
  )
    .then((response: Response) => {
      console.log("Response from Mapbox:", response.status);
      if (response.status === 200) return response.json();
      if (response.status === 422) {
        response.json().then((json: unknown) => {
          console.log("Status 422:", JSON.stringify(json));
        });
      }
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Directions: ", JSON.stringify(json));
        const directions = json as DirectionsResponse;
        const route = directions.routes[0];

        return route as Route;
      } else throw "Mapbox API Failure";
    });
}
