import { Model } from "mongoose";
import { Tour } from "../models";
import "./entourage-svc.ts";
export declare const tourModel: Model<Tour, {}, {}, {}, import("mongoose").Document<unknown, {}, Tour, {}> & Tour & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
declare function index(): Promise<Tour[]>;
declare function get(id: String): Promise<Tour>;
declare function create(profile: Tour): Promise<Tour>;
declare function update(id: String, tour: Tour): Promise<Tour>;
declare const _default: {
    index: typeof index;
    get: typeof get;
    create: typeof create;
    update: typeof update;
};
export default _default;
