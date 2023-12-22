import { createContext } from "@lit/context";
import type { Tour } from "../../models/Tour";
export const tourContext = createContext<Tour | undefined>(
  "tour"
);
