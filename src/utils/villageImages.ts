const villageImages: Partial<Record<string, string>> = {
  dagen: "/images/kantor-desa-dagen.webp",
  ngringo: "/images/kantor-desa-ngringo.webp",
  sroyo: "/images/kantor-desa-sroyo.webp",
};

export function getVillageImage(slug: string): string {
  return villageImages[slug] ?? "/images/village-placeholder.svg";
}
