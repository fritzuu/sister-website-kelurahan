import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMapLocations } from "../content/mapLocations";
import type { MapLocation } from "../content/mapLocations";
import { loadLeaflet } from "../utils/leaflet";
import type { MapInstance, MapMarker } from "../utils/leaflet";
import type { TileEvent } from "leaflet";
import { getDirectionsUrl, getMapSearchUrl, resolveMapLocation } from "../utils/mapGeocoding";
import { MapSkeleton } from "./Loading";
import "../styles/maps.css";

interface VillageMapProps {
  villageSlug?: string;
  offices?: boolean;
  title: string;
}
type LocationStatus = "loading" | "ready" | "missing" | "error";

export function VillageMap({ villageSlug, offices = false, title }: VillageMapProps) {
  const locations = useMemo(() => getMapLocations(villageSlug, offices), [villageSlug, offices]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const markersRef = useRef(new Map<string, { marker: MapMarker; coordinates: [number, number] }>());
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tilesLoading, setTilesLoading] = useState(false);
  const [error, setError] = useState("");
  const [tileError, setTileError] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, LocationStatus>>({});
  const [resolvedCoordinates, setResolvedCoordinates] = useState<Record<string, [number, number]>>({});
  const [selected, setSelected] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let instance: MapInstance | null = null;
    let resizeObserver: ResizeObserver | undefined;
    const markers = markersRef.current;
    markers.clear();

    async function initialize() {
      try {
        const leaflet = await loadLeaflet();
        if (cancelled || !containerRef.current) return;
        setError("");
        setTileError(false);
        setSelected("");
        setResolvedCoordinates({});
        setStatuses(Object.fromEntries(locations.map((location) => [location.id, "loading"])));
        // Initial regional view only; marker positions come from location data/search.
        instance = leaflet.map(containerRef.current, { scrollWheelZoom: false })
          .setView([-7.57, 110.88], 12);
        mapRef.current = instance;
        const tiles = leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
        });
        const failedTiles = new Set<HTMLElement>();
        tiles.on("loading", () => { if (!cancelled) setTilesLoading(true); });
        tiles.on("load", () => { if (!cancelled) setTilesLoading(false); });
        tiles.on("tileerror", (event) => {
          failedTiles.add((event as TileEvent).tile);
          if (!cancelled) {
            setTileError(true);
            setLoading(false);
          }
        });
        tiles.on("tileload tileunload", (event) => {
          failedTiles.delete((event as TileEvent).tile);
          if (!cancelled) {
            setTileError(failedTiles.size > 0);
            if (event.type === "tileload") setLoading(false);
          }
        });
        tiles.addTo(instance);
        resizeObserver = new ResizeObserver(() => instance?.invalidateSize());
        resizeObserver.observe(containerRef.current);

        for (const location of locations) {
          if (cancelled) return;
          try {
            const coordinates = await resolveMapLocation(location);
            if (cancelled) return;
            if (!coordinates) {
              setStatuses((current) => ({ ...current, [location.id]: "missing" }));
              continue;
            }
            const popup = document.createElement("div");
            popup.className = "location-map-popup";
            const heading = document.createElement("strong");
            heading.textContent = location.name;
            const description = document.createElement("p");
            description.textContent = location.description;
            popup.append(heading, description);
            if (location.profilePath) {
              const profile = document.createElement("button");
              profile.type = "button";
              profile.textContent = "Lihat Profil Desa →";
              profile.onclick = () => navigate(location.profilePath!);
              popup.append(profile);
            }
            const directions = document.createElement("a");
            directions.textContent = "Petunjuk Arah ↗";
            directions.href = getDirectionsUrl({ ...location, coordinates });
            directions.target = "_blank";
            directions.rel = "noopener noreferrer";
            popup.append(directions);
            const marker = leaflet.marker(coordinates, {
              title: location.name,
              alt: location.name,
              icon: leaflet.divIcon({
                html: `<span class="location-map-pin" style="--pin-color:${location.color}"><span></span></span>`,
                className: "location-map-marker",
                iconSize: [48, 60],
                iconAnchor: [24, 60],
                popupAnchor: [0, -58],
              }),
            }).addTo(instance!).bindPopup(popup).bindTooltip(location.name, {
              direction: "top",
              permanent: true,
              className: "location-map-label",
              offset: [0, -42],
            });
            marker.on("click", () => setSelected(location.id));
            markers.set(location.id, { marker, coordinates });
            setResolvedCoordinates((current) => ({ ...current, [location.id]: coordinates }));
            setStatuses((current) => ({ ...current, [location.id]: "ready" }));
            const bounds = [...markers.values()].map((item) => item.coordinates);
            instance!.fitBounds(bounds, { padding: [90, 90], maxZoom: offices ? 16 : 14 });
          } catch {
            if (!cancelled) setStatuses((current) => ({ ...current, [location.id]: "error" }));
          }
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setError("Peta belum dapat dimuat. Gunakan tautan lokasi di bawah atau coba lagi.");
          setStatuses(Object.fromEntries(locations.map((location) => [location.id, "error"])));
        }
      }
    }
    void initialize();
    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      instance?.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, [visible, locations, navigate, retry, offices]);

  function selectLocation(location: MapLocation) {
    const entry = markersRef.current.get(location.id);
    if (!entry) return;
    setSelected(location.id);
    mapRef.current?.setView(entry.coordinates, offices ? 16 : 14);
    entry.marker.openPopup();
    containerRef.current?.scrollIntoView({ block: "nearest" });
  }

  function retryMap() {
    setLoading(true);
    setError("");
    setRetry((value) => value + 1);
  }

  return (
    <div className={`location-map ${offices ? "location-map-offices" : ""}`}>
      <div className="location-map-frame">
        <div ref={containerRef} className="location-map-canvas" role="region" aria-label={title} aria-busy={(loading || tilesLoading) && !error} />
        {(loading || error) && (
          <div className="location-map-overlay" role="status">
            {error ? <span>{error}</span> : <><MapSkeleton /><span className="sr-only">Memuat peta…</span></>}
            {error && <button type="button" className="btn btn-secondary btn-sm" onClick={retryMap}>Coba Lagi</button>}
          </div>
        )}
        {tilesLoading && !loading && !error && (
          <div className="map-tile-loading" role="status"><span className="loading-spinner" aria-hidden="true" />Memuat area peta…</div>
        )}
      </div>
      <div className="location-map-list" aria-label="Daftar lokasi pada peta">
        {locations.map((location) => {
          const status = statuses[location.id];
          const coordinates = resolvedCoordinates[location.id];
          return (
            <div key={location.id} className={`location-map-card ${selected === location.id ? "is-selected" : ""}`}>
              <button type="button" className="location-map-select" disabled={status !== "ready"}
                aria-pressed={selected === location.id} onClick={() => selectLocation(location)}>
                <span className="location-map-dot" style={{ background: location.color }} aria-hidden="true" />
                <span>{location.name}</span>
              </button>
              <p>{location.description}</p>
              <div className="location-map-actions">
                {location.profilePath && <Link to={location.profilePath}>Profil Desa →</Link>}
                <a href={coordinates ? getDirectionsUrl({ ...location, coordinates }) : getMapSearchUrl(location)}
                  target="_blank" rel="noopener noreferrer">{coordinates ? "Petunjuk Arah ↗" : "Cari Lokasi ↗"}</a>
              </div>
            </div>
          );
        })}
      </div>
      {tileError && (
        <div className="location-map-footer">
          {tileError && <p>Peta tidak dapat dimuat. Silakan gunakan tautan lokasi.</p>}
          <button type="button" className="btn btn-secondary btn-sm" onClick={retryMap}>Muat Ulang Peta</button>
        </div>
      )}
    </div>
  );
}
