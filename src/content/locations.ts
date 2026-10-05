import type { VillageSlug } from './villages';

// Public gazetteer points for orientation, not verified office locations or administrative boundaries.
export const locations: Record<VillageSlug, {
  coordinates: [number, number]; sourceUrl: string; sourceLabel: string; checkedAt: string;
}> = {
  dagen: { coordinates: [-7.5664, 110.8946], sourceUrl: 'https://mapcarta.com/16216490', sourceLabel: 'Mapcarta · OpenStreetMap / GeoNames', checkedAt: '2026-10-05' },
  ngringo: { coordinates: [-7.5567, 110.8742], sourceUrl: 'https://mapcarta.com/16212986', sourceLabel: 'Mapcarta · GeoNames', checkedAt: '2026-10-05' },
  sroyo: { coordinates: [-7.53861, 110.89361], sourceUrl: 'https://mapcarta.com/16216324', sourceLabel: 'Mapcarta · GeoNames', checkedAt: '2026-10-05' },
};
export const tileProvider = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
};
