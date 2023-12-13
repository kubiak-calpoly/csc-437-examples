import {
  geoEquirectangular,
  geoPath
} from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";
import { html, effect } from "./utils.js";

export class MapWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      MapWidget.template.cloneNode(true)
    );
    this._viewBox = [
      [0, 0],
      [1000, 1000]
    ];
  }

  static template = html`
    <section>
      <h2>Map</h2>
      <svg viewBox="0 0 1000 1000" id="map-area">
        <g class="map"></g>
      </svg>
    </section>
    <style>
      :host {
        grid-area: map;
      }
      svg#map-area {
        width: 100%;
        aspect-ratio: 1;
        fill: none;
        stroke: var(--color-accent);
        stroke-width: 5px;
      }
    </style>
  `;

  connectedCallback() {
    const src = this.getAttribute("src");

    if (src) {
      this._fetchData(src);
    }
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      if (oldValue) {
        this._clearData();
      }
      if (newValue && oldValue !== null) {
        this._fetchData(newValue);
      }
    }
  }

  _fetchData(src) {
    console.log("Fetching GeoJSON data", src);
    fetch(src)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((geojson) => {
        this._renderMap(geojson);
      });
  }

  _renderMap(geojson) {
    const { features } = geojson;
    const projection = geoEquirectangular().fitExtent(
      this._viewBox,
      geojson
    );
    const geoGenerator = geoPath().projection(projection);
    const paths = features.map(geoGenerator);
    const g = this.shadowRoot.querySelector("#map-area .map");

    paths.forEach((d) => {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      el.setAttributeNS(null, "d", d);
      g.append(el);
    });
  }
}
