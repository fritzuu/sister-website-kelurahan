import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';
import { photos } from '../content/photos';
import { villages } from '../content/villages';
import type { VillageSlug } from '../content/villages';

export function PhotoGallery({ village, showSource }: { village?: VillageSlug; showSource: (id: string) => void }) {
  const entries = photos.filter(p => !village || p.village === village);
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const current = index === null ? null : entries[index];
  useEffect(() => { if (current && !dialog.current?.open) dialog.current?.showModal(); else if (!current) dialog.current?.close(); }, [current]);
  function change(step: number) { setIndex(i => i === null ? null : (i + step + entries.length) % entries.length); }
  return <section className={`photo-gallery container section-space ${village ? 'single-village-gallery village-section' : ''}`} id="galeri" aria-labelledby="gallery-title">
    <div className="section-heading" data-reveal><div><h2 id="gallery-title">Tempat. Pertemuan.<br/><span className="serif italic">Jejak kehidupan.</span></h2></div></div>
    <div className="photo-gallery-grid">{entries.map((p,i) => <figure key={p.id} className={`photo-figure photo-${p.village}`} data-reveal><button className="photo-open" onClick={() => setIndex(i)} aria-label={`Lihat foto ${p.village === 'dagen' ? 'Stasiun Palur' : p.village === 'ngringo' ? 'rapat Ngringo' : 'penyuluhan Sroyo'}`}><span className="photo-parallax"><img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async"/></span><span className="photo-expand"><Expand size={17}/></span></button><figcaption><span className="eyebrow">{villages.find(v=>v.slug===p.village)?.name}</span><h3>{p.title}</h3><p>{p.caption}</p><div className="photo-credit"><span>{p.credit}</span>{p.licenseUrl ? <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer">{p.license}<ArrowUpRight size={11}/></a> : <span>{p.license}</span>}<button onClick={() => showSource(p.id)} aria-label={`Periksa sumber foto ${p.village}`}>Sumber foto <ArrowUpRight size={12}/></button></div></figcaption></figure>)}</div>
    <dialog className="photo-dialog" ref={dialog} aria-label="Penampil foto dokumentasi" onCancel={() => setIndex(null)} onClick={e=> { if(e.target === e.currentTarget) setIndex(null); }} onKeyDown={e=>{ if(entries.length>1 && (e.key==='ArrowLeft'||e.key==='ArrowRight')) { e.preventDefault(); change(e.key==='ArrowLeft'?-1:1); } }}>
      {current && <><div className="photo-dialog-bar"><span className="eyebrow">DOKUMENTASI / {index!+1} DARI {entries.length}</span><button className="icon-button" aria-label="Tutup foto" onClick={()=>setIndex(null)}><X size={23}/></button></div><AnimatePresence mode="wait" initial={false}><motion.div key={current.id} initial={{opacity: reduced ? 1 : 0}} animate={{opacity:1}} exit={{opacity: reduced ? 1 : 0}} transition={{duration:reduced?0:.15}}><img className="photo-full" src={current.src} alt={current.alt}/><p className="photo-full-caption">{current.caption}</p><div className="photo-full-credit"><span>{current.credit} · {current.date}</span><a href={current.sourceUrl} target="_blank" rel="noopener noreferrer">Buka sumber asli <ArrowUpRight size={13}/></a>{current.licenseUrl ? <a href={current.licenseUrl} target="_blank" rel="noopener noreferrer">{current.license}</a> : <span>{current.license}</span>}</div></motion.div></AnimatePresence>{entries.length>1 && <div className="photo-dialog-navigation"><button onClick={()=>change(-1)} aria-label="Foto sebelumnya"><ArrowLeft size={17}/> Sebelumnya</button><button onClick={()=>change(1)} aria-label="Foto berikutnya">Berikutnya <ArrowRight size={17}/></button></div>}</>}
    </dialog>
  </section>;
}
