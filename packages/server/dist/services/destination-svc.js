import { tourModel } from "./tour-svc.js";
function get(tourId, destIndex) {
    return (tourModel
        .findById(tourId)
        .then((doc) => {
        const tour = doc;
        return tour.destinations[destIndex];
    })
        .catch((err) => {
        console.log("Not found!", err);
        throw `${tourId} Not Found`;
    }));
}
function update(tourId, destIndex, newDest) {
    const path = "destinations." + destIndex;
    console.log("Updating destination", newDest);
    return tourModel
        .findByIdAndUpdate(tourId, {
        $set: { [path]: newDest }
    }, { new: true })
        .then((doc) => {
        console.log("Updated destination", doc);
        if (!doc)
            throw `Tour ${tourId} not found`;
        const tour = doc;
        return tour.destinations[destIndex];
    });
}
export default { get, update };
