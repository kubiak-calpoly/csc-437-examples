import { Schema, model } from "mongoose";
const TravelerSchema = new Schema({
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    home: { type: String, trim: true },
    airports: [String],
    avatar: String,
    color: String
}, { collection: "traveler_profiles" });
const TravelerModel = model("Traveler", TravelerSchema);
function index() {
    return TravelerModel.find();
}
function get(userid) {
    return TravelerModel.find({ userid })
        .then((list) => list[0]);
}
function update(userid, traveler) {
    return TravelerModel.findOneAndUpdate({ userid }, traveler, {
        new: true
    }).then((updated) => {
        return updated ? updated : undefined;
    });
}
function create(traveler) {
    const p = new TravelerModel(traveler);
    return p.save();
}
function remove(userid) {
    return TravelerModel.findOneAndDelete({ userid }).then((deleted) => !!deleted);
}
export default { index, get, create, update, remove };
