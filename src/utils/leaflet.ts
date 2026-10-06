import "leaflet/dist/leaflet.css";

export type MapInstance = import("leaflet").Map;
export type MapMarker = import("leaflet").Marker;
let leafletPromise: Promise<typeof import("leaflet")> | undefined;
export function loadLeaflet(): Promise<typeof import("leaflet")> {
  leafletPromise ??= import("leaflet").catch((error: unknown) => {
    leafletPromise = undefined;
    throw error;
  });
  return leafletPromise;
}
