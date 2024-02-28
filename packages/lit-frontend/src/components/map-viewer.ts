import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import {
  Map,
  Marker,
  //Popup,
  LngLatLike,
  LngLatBoundsLike
} from "mapbox-gl";
import mapboxStyles from "/src/styles/mapbox-gl.css?inline";
import {
  Place,
  bboxOfFeatures,
  featureLngLat
} from "ts-models";

@customElement("map-viewer")
export class MapViewerElement extends LitElement {
  @state()
  accessToken: string;

  @property({ attribute: false })
  places: Place[] = [];

  map?: Map;

  constructor() {
    super();

    this.accessToken = // TODO: get this over an API
      "pk.eyJ1Ijoia3ViaWFrLWNhbHBvbHkiLCJhIjoiY2x0MjBvZGd2MTQxYjJrbXJ2ZzFhZWgxMSJ9.zdBsMVeJtBL4WtDLBWrUmg";
  }

  updated() {
    const mapElement = this.shadowRoot?.querySelector(
      "#map"
    ) as HTMLElement;

    console.log("Mapping places:", this.places);

    if (mapElement && this.places.length > 0) {
      const features = this.places.map((p) => p.feature);
      const bbox = bboxOfFeatures(features).map((pt) => [
        pt.lon,
        pt.lat
      ]) as LngLatBoundsLike;

      this.map = new Map({
        accessToken: this.accessToken,
        container: mapElement,
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        bounds: bbox
      });

      this.places.forEach((p) => {
        const m = new Marker().setLngLat(
          featureLngLat(p.feature) as LngLatLike
        );
        // .setHTML(`<h6>${p.name}</h6>`);
        m.addTo(this.map as Map);
      });
    }
  }

  render() {
    return html`
      <div id="map"></div>
    `;
  }

  static styles = [
    unsafeCSS(mapboxStyles),
    css`#map { aspect-ratio: 3/4`
  ];
}
