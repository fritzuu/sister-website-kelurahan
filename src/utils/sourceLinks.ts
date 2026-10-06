import type { Source } from "../types/village";

export function getSourceLinkLabel(source: Source): string {
  const url = new URL(source.url);
  return url.pathname === "/" && !url.search && !url.hash
    ? "Kunjungi Website Sumber"
    : "Buka Dokumen";
}
