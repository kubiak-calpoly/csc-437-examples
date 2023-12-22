import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import type { Tour } from "../../models/Tour";

import { tourContext } from "./tour-context.js";

export class ItineraryBuilder extends LitElement {
  @consume({ context: tourContext })
  @property({ attribute: false })
  public tour?: Tour;
}
