import { createContext } from "@lit/context";
import type { Tour } from "../../models/Tour";
export default createContext<Tour>(Symbol("tour"));
