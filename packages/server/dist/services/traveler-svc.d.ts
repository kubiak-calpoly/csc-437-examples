import { Traveler } from "../models/traveler";
declare function index(): Promise<Traveler[]>;
declare function get(userid: String): Promise<Traveler | undefined>;
declare function update(userid: String, traveler: Traveler): Promise<Traveler | undefined>;
declare function create(traveler: Traveler): Promise<Traveler>;
declare function remove(userid: String): Promise<Boolean>;
declare const _default: {
    index: typeof index;
    get: typeof get;
    create: typeof create;
    update: typeof update;
    remove: typeof remove;
};
export default _default;
