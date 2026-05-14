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
    return new Promise((resolve, reject) => {
        const path = `destinations.${tourId}`;
        tourModel
            .findByIdAndUpdate(tourId, {
            $set: { [path]: newDest }
        }, { new: true })
            .then((doc) => {
            if (doc) {
                const tour = doc;
                resolve(tour.destinations[destIndex]);
            }
            else
                reject(`Tour ${tourId} not found`);
        })
            .catch((error) => {
            console.log("Cannot update Destination:", error);
            reject(error);
        });
    });
}
export default { get, update };
