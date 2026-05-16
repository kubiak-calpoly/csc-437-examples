import { Schema, model } from "mongoose";
import "./entourage-svc.js"; // to load schema
const tourSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    entourage: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Entourage"
    },
    destinations: [
        {
            name: String,
            startDate: Date,
            endDate: Date,
            location: { lat: Number, lon: Number },
            featuredImage: String,
            accommodations: [
                {
                    name: String,
                    checkIn: Date,
                    checkOut: Date,
                    roomType: String,
                    persons: Number,
                    rate: {
                        amount: Number,
                        currency: String
                    }
                }
            ],
            excursions: [{ name: String, type: { type: String } }],
            link: String
        }
    ],
    transportation: [
        {
            type: { type: String },
            startDate: Date,
            endDate: Date,
            segments: [
                {
                    name: String,
                    provider: String,
                    departure: {
                        name: String,
                        station: String,
                        time: Date,
                        tzoffset: Number
                    },
                    arrival: {
                        name: String,
                        station: String,
                        time: Date,
                        tzoffset: Number
                    }
                }
            ]
        }
    ]
}, { collection: "tour_collection" });
export const tourModel = model("Tour", tourSchema);
function index() {
    return tourModel.find();
}
function get(id) {
    return (tourModel
        .findById(id)
        // when you fetch a single tour,
        // the entourage is populated
        .populate({
        path: "entourage",
        populate: {
            path: "people"
        }
    })
        .then((doc) => {
        if (!doc)
            throw `No Tour for id: ${id}`;
        return doc.toObject();
    })
        .catch((err) => {
        console.log("Not found!", err);
        throw `${id} Not Found`;
    }));
}
function create(profile) {
    const p = new tourModel(profile);
    return p.save();
}
function update(id, tour) {
    return new Promise((resolve, reject) => {
        tourModel
            .findByIdAndUpdate(id, tour, {
            new: true
        })
            .then((doc) => {
            if (doc)
                resolve(doc);
            else
                reject("Failed to update tour");
        });
    });
}
export default {
    index,
    get,
    create,
    update
};
