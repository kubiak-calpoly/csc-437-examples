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
    return tourModel
        .findByIdAndUpdate(tourId, {
        $set: { [path]: newDest }
    }, { new: true })
        .then((doc) => {
        if (!doc)
            throw `Tour ${tourId} not found`;
        const tour = doc;
        return tour.destinations[destIndex];
    });
}
export default { get, update };
