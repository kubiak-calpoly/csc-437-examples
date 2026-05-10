import { Traveler } from "./traveler.ts";
export interface Entourage {
    name?: string;
    people: Traveler[];
}
