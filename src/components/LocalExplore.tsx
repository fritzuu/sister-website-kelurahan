import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, BookOpen, Leaf, MapPin, Music2, Search, Store, X } from 'lucide-react';
import { exploreEntries, exploreSources } from '../content/explore';
import type { ExploreCategory } from '../content/explore';
import { villages } from '../content/villages';
import type { VillageSlug } from '../content/villages';

const icons = { UMKM: Store, Budaya: Music2, Lingkungan: Leaf };
export function LocalExplore({ activeVillage, selectVillage, showSource }: { activeVillage: VillageSlug | null; selectVillage: (v: VillageSlug | null) => void; showSource: (id: string) => void }) {
  const [category, setCategory] = useState<ExploreCategory | 'Semua'>('Semua');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(exploreEntries[0].id);
  const reduced = useReducedMotion();
  const searchId = useId();
  const matches = exploreEntries.filter(e => (!activeVillage || e.village === activeVillage) && (category === 'Semua' || e.category === category) && `${e.name} ${e.address} ${e.category}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id')));
  const selected = matches.find(e => e.id === selectedId) ?? matches[0];
  const source = selected && exploreSources[selected.source];
  const village = villages.find(v => v.slug === selected?.village);
  const Icon = selected ? icons[selected.category] : Search;
  function reset() { selectVillage(null); setCategory('Semua'); setQuery(''); }
  return <div className="local-explore" id="potensi">
    <div className="explore-heading"><div><h3>Usaha, budaya,<br/>dan <span className="serif italic">inisiatif warga.</span></h3></div></div>
    <div className="explore-toolbar"><div className="light-tabs" aria-label="Filter kategori potensi">{(['Semua', 'UMKM', 'Budaya', 'Lingkungan'] as const).map(c => <button key={c} className={c === category ? 'active' : ''} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="explore-search"><Search size={17}/><label className="sr-only" htmlFor={searchId}>Cari potensi lokal</label><input id={searchId} value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama atau alamat…" type="search"/>{query && <button aria-label="Hapus pencarian" onClick={() => setQuery('')}><X size={15}/></button>}</div></div>
    <div className="explore-result-count" role="status">{matches.length} catatan{activeVillage ? ` di ${villages.find(v=>v.slug===activeVillage)?.name}` : ' di tiga desa'}{(activeVillage || category !== 'Semua' || query) && <button onClick={reset}>Reset filter <X size={12}/></button>}</div>
    {selected ? <div className="explore-layout"><div className="explore-list" aria-label="Pilihan potensi lokal">{matches.map(entry => { const EntryIcon = icons[entry.category]; return <button key={entry.id} aria-pressed={selected.id === entry.id} className={`explore-row ${selected.id === entry.id ? 'active' : ''}`} onClick={() => setSelectedId(entry.id)}><EntryIcon size={19} strokeWidth={1.3}/><span><small>{villages.find(v=>v.slug===entry.village)?.name} / {entry.category}</small><strong>{entry.name}</strong></span><ArrowUpRight size={18}/></button>; })}</div><div className="explore-detail-shell"><AnimatePresence mode="wait" initial={false}><motion.article key={selected.id} className="explore-detail" initial={{opacity:reduced?1:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:reduced?1:0}} transition={{duration:reduced?0:.18}} style={{borderTopColor:village?.accent}}><div className="explore-detail-top"><Icon size={35} strokeWidth={1}/><span className="eyebrow">{village?.name} / {selected.category}</span></div><h4>{selected.name}</h4><p>{selected.description}</p><div className="explore-address"><MapPin size={16}/><span>{selected.address}</span></div><div className="explore-actions"><button onClick={() => { selectVillage(selected.village); document.getElementById('peta')?.scrollIntoView({behavior: reduced ? 'instant' : 'smooth', block:'start'}); }}>Lihat area desa <ArrowUpRight size={15}/></button>{selected.category === 'UMKM' && <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selected.name}, ${selected.address}, Karanganyar, Jawa Tengah`)}`}>Cari alamat di Google Maps <ArrowUpRight size={15}/></a>}</div><div className="explore-citation"><button onClick={() => source && showSource(source.id)}><BookOpen size={14}/> Periksa sumber <ArrowUpRight size={13}/></button></div></motion.article></AnimatePresence></div></div> : <div className="explore-empty"><Search size={27} strokeWidth={1.2}/><h4>Belum ada catatan yang cocok.</h4><p>Coba nama lain atau tampilkan kembali semua pilihan.</p><button className="text-link" onClick={reset}>Tampilkan semua catatan <ArrowUpRight size={15}/></button></div>}
    <details className="content-notes"><summary>Tentang informasi ini</summary><p>Pilihan ini bukan direktori lengkap. Tahun pendataan UMKM tidak dicantumkan oleh penerbit; operasional, jam buka, dan titik persis usaha belum dikonfirmasi. Peta menampilkan area desa. Catatan budaya dan lingkungan mengikuti tahun sumber.</p></details>
  </div>;
}
