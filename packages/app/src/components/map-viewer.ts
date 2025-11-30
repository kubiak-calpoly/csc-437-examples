import { LitElement, css, html } from "lit";
import {
  property,
  state
} from "lit/decorators.js";
import mapboxgl, {
  MapboxOptions,
  Marker,
  LngLatLike,
  LngLatBoundsLike
} from "mapbox-gl";
import mapboxCSS from "../styles/mapbox-gl.css";
import {
  Place,
  Route,
  bboxOfFeatures,
  featureLngLat
} from "server/models";

export class MapViewerElement extends LitElement {
  @state()
  accessToken: string;

  @property({ attribute: false })
  places: Place[] = [];

  @property({ attribute: false })
  route?: Route;

  constructor() {
    super();

    this.accessToken = // TODO: get this over an API
      "pk.eyJ1Ijoia3ViaWFrLWNhbHBvbHkiLCJhIjoiY2x0MjB0cTA1MWZucTJqcGh6bnlqeDlyNCJ9.h_hlfcOiEAG56MtE6WZcGw"
  }

  updated(changes: Map<string, any>) {
    const mapElement = this.shadowRoot?.querySelector(
      "#map"
    ) as HTMLElement;

    if (
      changes.has("places") &&
      mapElement &&
      this.places.length > 0
    ) {
      console.log("Mapping places:", this.places);
      let map = createMap(this.places, {
        accessToken: this.accessToken,
        container: mapElement,
        style: "mapbox://styles/mapbox/streets-v12" // style URL
      });

      markPlaces(map, this.places);

      if (this.route) markRoute(map, this.route);
    }
  }

  render() {
    return html`
      <div id="map"></div>
    `;
  }

  static styles = [
    mapboxCSS.styles,
    css`#map { aspect-ratio: 3/4 }`
  ];
}

function createMap(places: Place[], options: MapboxOptions) {
  const features = places.map((p) => p.feature);
  const bbox = bboxOfFeatures(features).map((pt) => [
    pt.lon,
    pt.lat
  ]) as LngLatBoundsLike;

  return new mapboxgl.Map({ bounds: bbox, ...options });
}

function markPlaces(map: mapboxgl.Map, places: Place[]) {
  places.forEach((p) => {
    const m = new Marker().setLngLat(
      featureLngLat(p.feature) as LngLatLike
    );
    m.addTo(map);
  });
}

function markRoute(map: mapboxgl.Map, route: Route) {
  const { geometry } = route;
  console.log("Route Geometry is:", geometry);

  map.on("load", () => {
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry
      }
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#888",
        "line-width": 8
      }
    });
  });
}
