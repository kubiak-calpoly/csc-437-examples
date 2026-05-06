import { Document, Model, Schema } from "mongoose";
import { Entourage } from "../models";
import "../services/traveler-svc.ts";
declare function index(): Promise<Entourage[]>;
declare function get(id: String): Promise<Entourage>;
declare function create(ent: Entourage): Promise<Entourage>;
declare function update(id: String, ent: Entourage): Promise<Entourage>;
declare const _default: {
    index: typeof index;
    get: typeof get;
    create: typeof create;
    update: typeof update;
    Schema: Schema<Entourage, Model<Entourage, any, any, any, Document<unknown, any, Entourage, any> & Entourage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Entourage, Document<unknown, {}, import("mongoose").FlatRecord<Entourage>, {}> & import("mongoose").FlatRecord<Entourage> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
export default _default;
