import { Destination } from "../models";
declare function get(tourId: String, destIndex: number): Promise<Destination>;
declare function update(tourId: String, destIndex: number, newDest: Destination): Promise<Destination>;
declare const _default: {
    get: typeof get;
    update: typeof update;
};
export default _default;
