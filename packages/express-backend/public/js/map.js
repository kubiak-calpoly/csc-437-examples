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
      <div class="overlay">
        <svg viewBox="0 0 1000 1000" id="map-area">
          <g class="basemap"></g>
        </svg>
        <div id="markers">
          <slot></slot>
        </div>
      </div>
    </section>
    <style>
      :host {
        grid-area: map;
        padding: 0 var(--size-spacing-medium);
      }
      .overlay {
        width: 100%;
        aspect-ratio: 1;
        position: relative;
      }
      .overlay > * {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      svg#map-area {
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
    fetch(src)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((geojson) => {
        this._updateGeoGenerator(geojson);
        this._renderMap(geojson);
        this._positionContents();
      });
  }

  _updateGeoGenerator(geojson) {
    const base = geoEquirectangular();
    const projection = geojson
      ? base.fitExtent(this._viewBox, geojson)
      : base;
    this._geoGenerator = geoPath().projection(projection);
  }

  _renderMap(geojson) {
    const { features } = geojson;
    const paths = features.map(this._geoGenerator);
    const g = this.shadowRoot.querySelector(
      "#map-area .basemap"
    );

    paths.forEach((d) => {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      el.setAttributeNS(null, "d", d);
      g.append(el);
    });
  }

  _positionContents() {
    const mapArea = this.shadowRoot.getElementById("map-area");
    const { width } = mapArea.getBoundingClientRect();
    const scale = width / this._viewBox[1][1];

    Array.from(this.children).forEach((marker) => {
      const lat = marker.getAttribute("lat");
      const lon = marker.getAttribute("lon");
      const text = marker.textContent;

      if (lat && lon) {
        const feature = {
          type: "Feature",
          properties: { name: text },
          geometry: {
            type: "Point",
            coordinates: [lon, lat]
          }
        };
        const path = this._geoGenerator(feature);
        const matches = path.match(/M([.0-9-]+),([.0-9-]+)/);
        if (matches) {
          const [_, x, y] = matches;
          marker.setPosition(
            scale * parseFloat(x),
            scale * parseFloat(y)
          );
        }
      }
    });
  }
}

export class MapMarker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      MapMarker.template.cloneNode(true)
    );
  }

  static template = html`
    <i>
      <svg class="icon">
        <use xlink:href="/icons/markers.svg#icon-poi"></use>
      </svg>
      <label><slot></slot></label>
    </i>
    <style>
      :host {
        position: absolute;
        bottom: 100%;
        left: -1rem;
        --transform-marker: scale(1);
      }
      :host([selected]) {
        --transform-marker: scale(1.5);
      }
      i {
        display: inline-block;
      }
      i:hover {
        --transform-marker: scale(1.5);
      }
      svg.icon {
        display: inline;
        height: 2rem;
        width: 2rem;
        vertical-align: bottom;
        fill: var(--color-accent);
        transform-origin: bottom center;
        transition: transform 0.5s;
        transform: var(--transform-marker);
      }
      label {
        margin-left: -0.5em;
      }
    </style>
  `;

  setPosition(x, y) {
    this.shadowRoot.firstElementChild.style.setProperty(
      "transform",
      `translate(${x}px,${y}px)`
    );
  }
}
