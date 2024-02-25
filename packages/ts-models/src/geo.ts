export interface Point {
  lat: number;
  lon: number;
}

export interface Region {
  path: Array<Point>;
}

type Feature = Point | Region;

export interface Place {
  name: string;
  feature: Feature;
}

export function bboxOfPoints(
  points: Point[],
  padding: number = 0
) {
  // TODO: make this wrap around at -180/180
  const minLng = points
    .map((pt) => pt.lon)
    .reduce((a, b) => Math.min(a, b), 180);

  const minLat = points
    .map((pt) => pt.lat)
    .reduce((a, b) => Math.min(a, b), 180);

  const maxLng = points
    .map((pt) => pt.lon)
    .reduce((a, b) => Math.max(a, b), -180);

  const maxLat = points
    .map((pt) => pt.lat)
    .reduce((a, b) => Math.max(a, b), -180);

  const padLng = padding * (maxLng - minLng);
  const padLat = padding * (maxLat - minLat);

  return [
    { lon: minLng - padLng, lat: minLat - padLat },
    { lon: maxLng + padLng, lat: maxLat + padLat }
  ];
}

export function bboxOfFeatures(
  features: Feature[],
  padding: number = 0.125
) {
  const featurePts = (f: Feature) => {
    if ("lat" in f && "lon" in f) {
      return [f];
    }
    if ("path" in f) {
      return bboxOfPoints(f.path); // unpadded
    }
    return [];
  };

  const points = features.map(featurePts).flat();
  return bboxOfPoints(points, padding);
}
