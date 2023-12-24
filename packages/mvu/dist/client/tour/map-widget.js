"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var map_widget_exports = {};
__export(map_widget_exports, {
  MapMarker: () => MapMarker,
  MapWidget: () => MapWidget
});
module.exports = __toCommonJS(map_widget_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_context = require("@lit/context");
var import_d3_geo = require("d3-geo");
var import_css_base = require("../shared/css-base");
class MapProjection {
  constructor(fn = (_) => ({ x: 0, y: 0 })) {
    this._projection = (_) => ({
      x: 0,
      y: 0
    });
    this._projection = fn;
  }
  project(pt) {
    return this._projection(pt);
  }
}
const mapContext = (0, import_context.createContext)(
  Symbol("mapProjection")
);
let MapWidget = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this._viewBox = [
      [0, 0],
      [1e3, 1e3]
    ];
    this.src = "";
    this._mapSvg = import_lit.svg`
      <g class="basemap">
      </g>
    `;
    this.projection = new MapProjection();
  }
  render() {
    return import_lit.html`
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
    fetch(src).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((geojson) => {
      const generator = this._updateGeoGenerator(geojson);
      this._mapSvg = this._renderMap(geojson, generator);
      this.projection = this._updateProjection(generator);
    });
  }
  _updateGeoGenerator(geojson) {
    const base = (0, import_d3_geo.geoEquirectangular)();
    const projection = geojson ? base.fitExtent(this._viewBox, geojson) : base;
    return (0, import_d3_geo.geoPath)(projection);
  }
  _renderMap(geojson, generator) {
    const { features } = geojson;
    const paths = features.map(generator);
    return import_lit.svg`
    <g class="basemap">
      ${paths.map((p) => import_lit.svg`<path d=${p} />`)}
    </g>
    `;
  }
  _updateProjection(generator) {
    const mapArea = this.shadowRoot?.getElementById("map-area");
    const markers = Array.from(this.children);
    const { width } = mapArea?.getBoundingClientRect() || {
      width: 0
    };
    const scale = width / this._viewBox[1][1];
    const projectionFn = (pt) => {
      const { lat, lon } = pt;
      if (lat && lon) {
        const features = [
          {
            type: "Feature",
            properties: { name: "marker" },
            geometry: {
              type: "Point",
              coordinates: [lon, lat]
            }
          }
        ];
        const [path] = features.map(generator);
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
    return new MapProjection(projectionFn);
  }
};
MapWidget.styles = [
  import_css_base.reset,
  import_css_base.elements,
  import_lit.css`
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
__decorateClass([
  (0, import_decorators.property)()
], MapWidget.prototype, "src", 2);
__decorateClass([
  (0, import_decorators.state)()
], MapWidget.prototype, "_mapSvg", 2);
__decorateClass([
  (0, import_context.provide)({ context: mapContext }),
  (0, import_decorators.state)()
], MapWidget.prototype, "projection", 2);
MapWidget = __decorateClass([
  (0, import_decorators.customElement)("map-widget")
], MapWidget);
let MapMarker = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.lat = 0;
    this.lon = 0;
    this.projection = new MapProjection();
  }
  render() {
    const pt = this;
    const { x, y } = this.projection.project(pt);
    const icon = import_lit.svg`
    <use href="/icons/markers.svg#icon-poi" />
    `;
    return import_lit.html`
      <i style="transform: translate(${x}px,${y}px)">
        <svg class="icon">${icon}</svg>
        <label><slot></slot></label>
      </i>
    `;
  }
};
MapMarker.styles = import_lit.css`
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
__decorateClass([
  (0, import_decorators.property)()
], MapMarker.prototype, "lat", 2);
__decorateClass([
  (0, import_decorators.property)()
], MapMarker.prototype, "lon", 2);
__decorateClass([
  (0, import_context.consume)({ context: mapContext })
], MapMarker.prototype, "projection", 2);
MapMarker = __decorateClass([
  (0, import_decorators.customElement)("map-marker")
], MapMarker);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MapMarker,
  MapWidget
});
//# sourceMappingURL=map-widget.js.map
