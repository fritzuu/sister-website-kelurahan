import type { MapLocation } from "../content/mapLocations";

// Offices without coordinates remain searchable links instead of estimated pins.
export function resolveMapLocation(location: MapLocation): Promise<[number, number] | null> {
  return Promise.resolve(location.coordinates ?? null);
}
export function getMapSearchUrl(location: MapLocation): string {
  return "https://www.openstreetmap.org/search?query=" + encodeURIComponent(location.query);
}
export function getDirectionsUrl(location: MapLocation): string {
  const destination = location.coordinates?.join(",") || location.query;
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(destination);
}
