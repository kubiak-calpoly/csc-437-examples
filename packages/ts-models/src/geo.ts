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
  const featurePts = (ft: Feature) => {
    if ("lat" in ft && "lon" in ft) return [ft];
    if ("path" in ft) return bboxOfPoints(ft.path); // unpadded
    return [];
  };

  const points = features.map(featurePts).flat();
  return bboxOfPoints(points, padding);
}

export function featureLngLat(ft: Feature) {
  if ("lat" in ft && "lon" in ft) return [ft.lon, ft.lat];
  if ("path" in ft) {
    const [pt0, pt1] = bboxOfFeatures(ft.path);
    return [(pt0.lon + pt1.lon) / 2, (pt0.lat + pt1.lat) / 2];
  }
  return [0, 0];
}
