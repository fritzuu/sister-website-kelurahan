import { getAllVillages, getVillageBySlug } from "./villages";
import { districtContact } from "./site";

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  query: string;
  color: string;
  profilePath?: string;
  // Set these after confirming a location to bypass address lookup.
  coordinates?: [number, number];
}

const colors: Record<string, string> = {
  dagen: "#D97706",
  ngringo: "#0284C7",
  sroyo: "#0D9488",
};

// OpenStreetMap location references: Dagen/Sroyo village points and
// Kantor Kepala Desa Ngringo. Keep office and village identifiers separate.
const confirmedCoordinates: Partial<Record<string, [number, number]>> = {
  dagen: [-7.5664289, 110.8946107],
  ngringo: [-7.5668649, 110.8722740],
  sroyo: [-7.5432842, 110.8903447],
  "ngringo-office": [-7.5668649, 110.8722740],
};

export function getMapLocations(slug?: string, offices = false): MapLocation[] {
  const villages = slug ? [getVillageBySlug(slug)].filter((v) => v !== undefined) : getAllVillages();
  const locations: MapLocation[] = villages.flatMap((village) => {
    const address = village.contact?.value.address;
    const officeCoordinates = confirmedCoordinates[`${village.slug}-office`];
    const showOffice = offices && Boolean(officeCoordinates);
    const villageLocation: MapLocation = {
      id: showOffice ? `${village.slug}-office` : village.slug,
      name: showOffice ? `Kantor Desa ${village.name}` : `Desa ${village.name}`,
      description: village.slug === "ngringo"
        ? "Kantor Kepala Desa Ngringo, Kecamatan Jaten, Kabupaten Karanganyar"
        : "Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah",
      query: `${village.name}, Jaten, Karanganyar, Jawa Tengah, Indonesia`,
      color: colors[village.slug],
      profilePath: `/desa/${village.slug}${showOffice ? "#kontak" : "#wilayah"}`,
      coordinates: showOffice ? officeCoordinates : confirmedCoordinates[village.slug],
    };
    if (!offices || showOffice || !address) return [villageLocation];
    return [{
      id: offices ? `${village.slug}-office` : village.slug,
      name: offices ? `Kantor Desa ${village.name}` : `Desa ${village.name}`,
      description: offices ? address! : village.slug === "ngringo"
        ? "Kantor Kepala Desa Ngringo, Kecamatan Jaten, Kabupaten Karanganyar"
        : "Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah",
      query: offices
        ? `Kantor Desa ${village.name}, ${address}`
        : `${village.name}, Jaten, Karanganyar, Jawa Tengah, Indonesia`,
      color: colors[village.slug],
      profilePath: `/desa/${village.slug}${offices ? "#kontak" : "#wilayah"}`,
      coordinates: confirmedCoordinates[offices ? `${village.slug}-office` : village.slug],
    }, villageLocation];
  });
  if (offices) {
    locations.push({
      id: "jaten-office",
      name: districtContact.name,
      description: districtContact.address,
      query: `${districtContact.name}, ${districtContact.address}`,
      color: "#005B94",
      coordinates: confirmedCoordinates["jaten-office"],
    });
  }
  return locations;
}
