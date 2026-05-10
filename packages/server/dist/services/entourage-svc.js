import { Schema, model } from "mongoose";
import "../services/traveler-svc.js";
const entourageSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    people: [{ type: Schema.Types.ObjectId, ref: "Traveler" }]
}, { collection: "entourage_collection" });
const entourageModel = model("Entourage", entourageSchema);
function index() {
    return entourageModel.find();
}
function get(id) {
    return entourageModel
        .findById(id)
        .populate("people")
        .then((doc) => doc)
        .catch((err) => {
        throw `${id} Not Found`;
    });
}
function create(ent) {
    const p = new entourageModel(ent);
    return p.save();
}
function update(id, ent) {
    return new Promise((resolve, reject) => {
        entourageModel
            .findByIdAndUpdate(id, ent, {
            new: true
        })
            .then((ent) => {
            if (ent)
                resolve(ent);
            else
                reject("Failed to update Entourage");
        });
    });
}
export default {
    index,
    get,
    create,
    update,
    Schema: entourageSchema
};
