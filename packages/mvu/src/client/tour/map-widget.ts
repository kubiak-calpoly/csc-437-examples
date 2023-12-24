import { css, html, svg, LitElement } from "lit";
import {
  customElement,
  state,
  property
} from "lit/decorators.js";
import { createContext, consume, provide } from "@lit/context";
import {
  geoEquirectangular,
  geoPath
} from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";
import { Point } from "../../../models/Geo.ts";
import { reset, elements } from "../shared/css-base";

type ProjectionFn = (Point) => { x: number; y: number };

class MapProjection {
  _projection: ProjectionFn = (_) => ({
    x: 0,
    y: 0
  });

  constructor(fn: ProjectionFn) {
    this._projection = fn || ((_) => ({ x: 0, y: 0 }));
  }

  project(pt: Point) {
    return this._projection(pt);
  }
}

const mapContext = createContext<MapProjection>(
  Symbol("mapProjection")
);

@customElement("map-widget")
export class MapWidget extends LitElement {
  _viewBox = [
    [0, 0],
    [1000, 1000]
  ];

  @property()
  src: string = "";

  @state()
  _mapSvg = svg`
      <g class="basemap">
      </g>
    `;

  @state()
  _geoGenerator = undefined;

  @provide({ context: mapContext })
  @state()
  projection = new MapProjection();

  render() {
    return html`
      <section>
        <h2>Map</h2>
        <div class="overlay">
          <svg viewBox="0 0 1000 1000" id="map-area">
            ${this._mapSvg}
          </svg>
          <div id="markers">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  static styles = [
    reset,
    elements,
    css`
      :host {
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
    `
  ];

  connectedCallback() {
    const src = this.getAttribute("src");
    super.connectedCallback();

    if (src) {
      this._fetchData(src);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
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
        this._mapSvg = this._renderMap(geojson);
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

    return svg`
    <g class="basemap">
      ${paths.map((p) => svg`<path d=${p} />`)}
    </g>
    `;
  }

  _positionContents() {
    const mapArea = this.shadowRoot.getElementById("map-area");
    const markers = Array.from(this.children);
    const { width } = mapArea.getBoundingClientRect();
    const scale = width / this._viewBox[1][1];

    const projectionFn = (pt: Point) => {
      const { lat, lon } = pt;
      if (lat && lon) {
        const feature = {
          type: "Feature",
          properties: { name: "marker" },
          geometry: {
            type: "Point",
            coordinates: [lon, lat]
          }
        };
        const path = this._geoGenerator(feature);
        const matches = path.match(/M([.0-9-]+),([.0-9-]+)/);
        if (matches) {
          const [_, x, y] = matches;
          return {
            x: scale * parseFloat(x),
            y: scale * parseFloat(y)
          };
        }
      }

      return { x: 0, y: 0 };
    };

    this.projection = new MapProjection(projectionFn);
  }
}

@customElement("map-marker")
export class MapMarker extends LitElement {
  @property()
  lat = 0;

  @property()
  lon = 0;

  @consume({ context: mapContext })
  projection = new MapProjection();

  render() {
    const pt = this as Point;
    const { x, y } = this.projection.project(pt);
    const icon = svg`
    <use href="/icons/markers.svg#icon-poi" />
    `;

    return html`
      <i style="transform: translate(${x}px,${y}px)">
        <svg class="icon">${icon}</svg>
        <label><slot></slot></label>
      </i>
    `;
  }

  static styles = css`
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
  `;
}
