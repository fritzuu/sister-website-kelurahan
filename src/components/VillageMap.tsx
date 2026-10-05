import { LocalExplore } from './LocalExplore';
import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker, TileLayer } from 'leaflet';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, MapPin, Maximize2 } from 'lucide-react';
import { format, villages } from '../content/villages';
import type { VillageSlug } from '../content/villages';
import { locations, tileProvider } from '../content/locations';
import 'leaflet/dist/leaflet.css';

export function VillageMap({ village, showSource }: { village?: VillageSlug; showSource: (id: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const instance = useRef<LeafletMap | null>(null);
  const markers = useRef<Map<VillageSlug, Marker>>(new Map());
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [tilesFailed, setTilesFailed] = useState(false);
  const [selected, setSelected] = useState<VillageSlug | null>(village ?? null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const selectedVillage = villages.find(v => v.slug === selected);

  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '180px' });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !host.current) return;
    let cancelled = false;
    let map: LeafletMap | undefined;
    let resize: ResizeObserver | undefined;
    let layer: TileLayer | undefined;
    let loadedTiles = 0;
    let failedTiles = 0;
    import('leaflet').then(L => {
      if (cancelled || !host.current) return;
      map = L.map(host.current, { scrollWheelZoom: false, zoomControl: false, minZoom: 8, maxZoom: 18, attributionControl: true });
      instance.current = map;
      L.control.zoom({ position: 'topright', zoomInTitle: 'Perbesar peta', zoomOutTitle: 'Perkecil peta' }).addTo(map);
      L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
      layer = L.tileLayer(tileProvider.url, { attribution: tileProvider.attribution, maxZoom: 19 });
      layer.on('tileload', () => { loadedTiles++; setTilesFailed(false); });
      layer.on('tileerror', () => { failedTiles++; if (loadedTiles === 0 && failedTiles >= 2) setTilesFailed(true); });
      layer.addTo(map);
      for (const v of villages) {
        const icon = L.divIcon({ className: 'village-map-marker', html: `<span style="--pin-color:${v.accent}"><i>${v.number}</i></span>`, iconSize: [38, 44], iconAnchor: [19, 42], tooltipAnchor: [0, -43] });
        const marker = L.marker(locations[v.slug].coordinates, { icon, title: `Pilih ${v.name}`, alt: `Titik referensi ${v.name}`, keyboard: true }).addTo(map);
        marker.bindTooltip(v.name, { permanent: true, direction: 'top', className: 'village-map-tooltip' });
        marker.getElement()?.setAttribute('aria-label', `Pilih desa ${v.name}`);
        marker.on('click', () => setSelected(v.slug));
        markers.current.set(v.slug, marker);
      }
      if (village) map.setView(locations[village].coordinates, 14, { animate: false });
      else map.fitBounds(villages.map(v => locations[v.slug].coordinates), { padding: [65, 65], maxZoom: 14, animate: false });
      resize = new ResizeObserver(() => map?.invalidateSize({ animate: false }));
      resize.observe(host.current);
      setReady(true);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; resize?.disconnect(); layer?.off(); map?.remove(); instance.current = null; markers.current.clear(); };
  }, [visible, village]);

  useEffect(() => {
    if (!ready || !instance.current) return;
    markers.current.forEach((marker, slug) => {
      marker.getElement()?.classList.toggle('is-selected', slug === selected);
      marker.getElement()?.setAttribute('aria-label', `Pilih desa ${villages.find(v => v.slug === slug)?.name ?? slug}`);
      marker.getElement()?.setAttribute('aria-pressed', String(slug === selected));
      marker.setZIndexOffset(slug === selected ? 1000 : 0);
    });
    if (selected) instance.current.flyTo(locations[selected].coordinates, 14, { animate: !reducedRef.current, duration: .9 });
    else instance.current.fitBounds(villages.map(v => locations[v.slug].coordinates), { padding: [65, 65], maxZoom: 14, animate: !reducedRef.current });
  }, [selected, ready]);

  function resetView() {
    if (selected !== null) setSelected(null);
    else instance.current?.fitBounds(villages.map(v => locations[v.slug].coordinates), { padding: [65, 65], maxZoom: 14, animate: !reduced });
  }
  const mapsQuery = selectedVillage ? `${selectedVillage.name}, Jaten, Karanganyar, Jawa Tengah, Indonesia` : 'Jaten, Karanganyar, Jawa Tengah, Indonesia';
  return <section ref={section} id="peta" className="village-section map-section container section-space" aria-labelledby="map-title">
    <div className="section-heading" data-reveal><div><h2 id="map-title">Sekarang, lihat<br/><span className="serif italic">tempatnya.</span></h2></div></div>
    <div className="map-layout"><aside className="map-sidebar"><div className="map-village-options" aria-label="Pilih desa di peta">{villages.map(v => <button key={v.slug} className={selected === v.slug ? 'active' : ''} aria-pressed={selected === v.slug} onClick={() => setSelected(v.slug)}><span className="map-option-number" style={{ color: v.accent }}>{v.number}</span><span><strong>{v.name}</strong></span><ArrowUpRight size={17}/></button>)}</div><motion.div key={selected ?? "all"} className="map-detail" aria-live="polite" initial={{opacity:reduced?1:0,y:reduced?0:10}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.28}}><h3>{selectedVillage?.name ?? 'Dagen. Ngringo. Sroyo.'}</h3><p>{selectedVillage ? `${format(selectedVillage.population)} penduduk · BPS 2024` : 'Tiga desa di Kecamatan Jaten, Kabupaten Karanganyar.'}</p>{selectedVillage && <Link className="text-link" to={`/desa/${selectedVillage.slug}`}>Baca profil desa <ArrowUpRight size={15}/></Link>}<a className="map-external" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">Buka Google Maps <ExternalLink size={14}/></a></motion.div></aside>
    <div className="map-canvas-wrap"><div ref={host} className="map-canvas" role="region" aria-label="Peta interaktif titik referensi Dagen, Ngringo, dan Sroyo"/>{!ready && <div className="map-loading" role="status"><MapPin size={27} strokeWidth={1.4}/><span>{failed ? 'Peta belum dapat dimuat.' : 'Menyiapkan peta Jaten…'}</span>{failed && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">Lihat di Google Maps <ExternalLink size={14}/></a>}</div>}{ready && <button className="map-reset" onClick={resetView}><Maximize2 size={14}/> Lihat tiga desa</button>}{tilesFailed && <div className="map-tile-notice" role="status">Gambar peta belum termuat. <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">Buka Google Maps</a></div>}</div></div>
    <div className="map-footnote"><details><summary>Tentang peta & sumber</summary><div><p>Pin menunjukkan area desa, bukan lokasi kantor atau batas resmi.</p>{villages.map(v=><a key={v.slug} href={locations[v.slug].sourceUrl} target="_blank" rel="noopener noreferrer">{v.name} · {locations[v.slug].sourceLabel}<ArrowUpRight size={12}/></a>)}<span>Koordinat referensi diperiksa 5 Oktober 2026. Peta dasar © OpenStreetMap contributors.</span><a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Laporkan koreksi peta <ArrowUpRight size={12}/></a></div></details></div>
    <LocalExplore activeVillage={selected} selectVillage={setSelected} showSource={showSource}/>
  </section>;
}
