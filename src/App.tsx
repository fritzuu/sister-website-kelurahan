import { AnimatedNumber } from './components/AnimatedNumber';
import { PhotoGallery } from './components/PhotoGallery';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight, ArrowLeft, MapPin, Menu, X, Plus, Check, BookOpen, ExternalLink, Info } from 'lucide-react';
import { Landscape } from './components/Landscape';
import { VillageMap } from './components/VillageMap';
import { format, metrics, sources, totals, villages } from './content/villages';
import type { Source, Village, VillageSlug } from './content/villages';

gsap.registerPlugin(ScrollTrigger);
const ease = [0.22, 1, 0.36, 1] as const;

function SourceDialog({ source, close }: { source: Source | null; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (source && !ref.current?.open) ref.current?.showModal(); else if (!source) ref.current?.close(); }, [source]);
  return <dialog ref={ref} className="source-dialog" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="source-title">
    {source && <><div className="dialog-top"><span className="eyebrow">Sumber informasi</span><button onClick={close} aria-label="Tutup sumber" className="icon-button"><X size={23}/></button></div><BookOpen size={34} strokeWidth={1.3}/><h2 id="source-title">{source.title}</h2><p className="source-publisher">{source.publisher}</p><span className="small-tag">{source.year}</span><p>{source.scope}</p><div className="source-context"><Info size={18}/><p>{source.note}</p></div><a className="button primary" href={source.url} target="_blank" rel="noopener noreferrer">Buka dokumen asli <ExternalLink size={17}/></a><p className="fine-print">Tahun sumber berbeda dari tanggal pembaruan atlas. Ketersediaan tautan mengikuti penerbit.</p></>}
  </dialog>;
}
function SourceButton({ onClick, dark = false }: { onClick: () => void; dark?: boolean }) {
  return <button className={`source-link ${dark ? 'on-dark' : ''}`} onClick={onClick}><span className="source-dot"/> Data 2024 · BPS Karanganyar <ArrowUpRight size={13}/></button>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); document.querySelector<HTMLButtonElement>('.menu-button')?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header"><Link to="/" className="brand" aria-label="Jaten, beranda"><span className="brand-symbol">j.</span><span>jaten</span></Link><nav className="desktop-nav" aria-label="Navigasi utama"><NavLink to="/" end>Beranda</NavLink><Link to="/#jelajah">Jelajahi desa</Link><Link to="/#bandingkan">Bandingkan</Link><Link to="/#peta">Peta desa</Link><Link to="/#galeri">Galeri foto</Link><NavLink to="/sumber">Sumber data <ArrowUpRight size={14}/></NavLink></nav><button className="menu-button icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Tutup menu' : 'Buka menu'}>{open ? <X/> : <Menu/>}</button><AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Navigasi ponsel" initial={{opacity:0, y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><Link to="/">Beranda</Link><Link to="/#jelajah">Jelajahi desa</Link><Link to="/#bandingkan">Bandingkan</Link><Link to="/#peta">Peta desa</Link><Link to="/#galeri">Galeri foto</Link><Link to="/sumber">Sumber data</Link></motion.nav>}</AnimatePresence></header>;
}
function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Link to="/" className="footer-brand">jaten<span>Kenali tempat. Pahami ceritanya.</span></Link><div className="footer-links">{villages.map(v=><Link key={v.slug} to={`/desa/${v.slug}`}>{v.name}<ArrowUpRight size={15}/></Link>)}<Link to="/sumber">Sumber data<ArrowUpRight size={15}/></Link></div></div><div className="footer-bottom"><p>Proyek akademik Sistem Terdistribusi.<br/>Bukan kanal layanan resmi pemerintah desa.</p><p>Dagen · Ngringo · Sroyo<br/>Konten: 5 Oktober 2026 · Statistik: 2024</p></div></footer>;
}
function Page({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => { document.title = title; document.querySelector('meta[name="description"]')?.setAttribute('content', description); }, [title, description]);
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const heroElements = gsap.utils.toArray<HTMLElement>('.hero-reveal');
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
      entrance.from('.hero-title-line', { yPercent: 110, rotation: 2, duration: 1.05, stagger: .13, clearProps: 'all' }, 0);
      if (heroElements.length) entrance.from(heroElements, { y: 26, opacity: 0, duration: .85, stagger: .09, clearProps: 'all' }, .15);
      gsap.utils.toArray<HTMLElement>('.section-heading').forEach(el => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        timeline.from(el.querySelector('h2'), { clipPath: 'inset(0 0 100% 0)', y: 24, duration: .95, clearProps: 'all' });
        const label = el.querySelector('.eyebrow');
        if (label) timeline.from(label, { opacity: 0, x: -14, duration: .5, clearProps: 'all' }, 0);
        const copy = el.querySelector(':scope > p, :scope > div:last-child:not(:first-child)');
        if (copy) timeline.from(copy, { opacity: 0, x: 20, duration: .7, clearProps: 'all' }, .2);
      });
      if (ref.current?.querySelector('.village-grid')) gsap.from('.village-card', { y: 65, opacity: 0, duration: .9, stagger: .14, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: '.village-grid', start: 'top 88%', once: true } });
      gsap.utils.toArray<HTMLElement>('.photo-open').forEach(el => {
        gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
      const media = gsap.matchMedia();
      media.add('(min-width: 761px)', () => {
        gsap.utils.toArray<HTMLElement>('.photo-parallax').forEach(el => gsap.fromTo(el, { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: el.closest('.photo-open'), start: 'top bottom', end: 'bottom top', scrub: .8 } }));
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]:not(.section-heading):not(.village-card)').forEach(el => gsap.from(el, { y: 32, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, clearProps: 'all' }));
      gsap.utils.toArray<HTMLElement>('.hero-art').forEach(el => {
        gsap.from(el, {opacity:0, scale:.96, duration:1.3, ease:'power3.out', clearProps:'all'});
        gsap.to(el.querySelector('.landscape-back'), {y:35, ease:'none', scrollTrigger:{trigger:el,start:'top top',end:'bottom top',scrub:1}});
        gsap.to(el.querySelector('.landscape-clouds'), {x:45, ease:'none', scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.5}});
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <div ref={ref}>{children}</div>;
}
function Home({ showSource }: { showSource: (id: string) => void }) {
  return <Page title="Jaten — Tiga desa, banyak cerita" description="Jelajahi Dagen, Ngringo, dan Sroyo melalui profil, statistik, serta sumber data. Atlas desa di Kecamatan Jaten, Karanganyar.">
    <section className="home-hero container"><div className="hero-copy"><h1 aria-label="Tiga desa. Banyak cerita."><span className="hero-title-mask"><span className="hero-title-line">Tiga desa.</span></span><span className="hero-title-mask"><span className="hero-title-line">Banyak <span className="serif italic">cerita.</span></span></span></h1><p className="hero-description hero-reveal">Dari Dagen, menyusuri Ngringo, hingga Sroyo.<br className="desktop-break"/> Kenali wilayah, kehidupan, dan angka di baliknya.</p><div className="hero-actions hero-reveal"><Link className="button primary" to="/#jelajah">Mulai menjelajah <ArrowUpRight size={19}/></Link></div></div><div className="hero-art"><Landscape/></div></section>
    <section className="aggregate container" aria-label="Akumulasi tiga desa"><div className="aggregate-caption"><p>Akumulasi tiga desa.<br/><SourceButton onClick={()=>showSource('bps')}/></p></div><div className="aggregate-stat"><AnimatedNumber value={totals.population}/><span>penduduk</span></div><div className="aggregate-stat"><AnimatedNumber value={totals.area} decimals={2}/><span>hektare wilayah</span></div><div className="aggregate-stat"><AnimatedNumber value={totals.dusun}/><span>dusun</span></div></section>
    <section className="explore container section-space" id="jelajah"><div className="section-heading" data-reveal><div><h2>Mulai dari<br/>rasa <span className="serif italic">ingin tahu.</span></h2></div></div><div className="village-grid">{villages.map((v,i)=><VillageCard key={v.slug} village={v} index={i}/>)}</div></section>
    <Story showSource={showSource}/>
    <Comparison showSource={showSource}/>
    <VillageMap showSource={showSource}/>
    <PhotoGallery showSource={showSource}/>
    <section className="source-teaser container section-space" data-reveal><div className="source-teaser-icon"><BookOpen size={48} strokeWidth={1}/></div><div><h2>Angka punya <span className="serif italic">asal.</span></h2><p>Kenali sumber, tahun, dan batas datanya.<br/>Karena mengenal tempat dimulai dari informasi yang jelas.</p></div><Link className="circle-link" to="/sumber" aria-label="Lihat sumber data"><ArrowUpRight size={27}/></Link></section>
  </Page>;
}
function VillageCard({ village: v, index }: { village: Village; index: number }) {
  const reduced = useReducedMotion();
  return <Link className="village-card" to={`/desa/${v.slug}`} style={{'--village-color':v.accent,'--village-light':v.light} as CSSProperties} data-reveal><motion.div className="village-card-art" initial="rest" whileHover="hover" whileTap={reduced ? {} : {scale:.985}} variants={{rest:{y:0,rotate:0},hover:{y:reduced?0:-6,rotate:reduced?0:.6}}} transition={{type:"spring",stiffness:240,damping:22}}><Landscape variant={index}/><span className="village-number">{v.number}</span><motion.span className="village-arrow" variants={{rest:{rotate:0,scale:1},hover:{rotate:reduced?0:45,scale:reduced?1:1.08}}}><ArrowUpRight size={23}/></motion.span></motion.div><div className="village-card-title"><h3>{v.name}</h3></div><div className="village-card-data"><span><strong>{format(v.population)}</strong> penduduk</span><span><strong>{format(v.area,2)}</strong> ha</span></div></Link>;
}
function Story({ showSource }: { showSource: (id: string) => void }) {
  const [chapter, setChapter] = useState(0);
  const chapters = [
    { name: 'Dagen', value: '5.810', unit: 'penduduk', title: 'Dimulai dari skala yang dekat.', text: 'Lima dusun membentuk Dagen. Di antara ketiganya, desa ini memiliki luas wilayah dan jumlah penduduk paling kecil.' },
    { name: 'Ngringo', value: '24.407', unit: 'penduduk', title: 'Lalu, kehidupan yang lebih padat.', text: 'Lebih dari separuh penduduk dalam cakupan atlas ini tinggal di Ngringo. Delapan dusun, 29 RW, dan 178 RT membentuk wilayahnya.' },
    { name: 'Sroyo', value: '459,78', unit: 'hektare', title: 'Dan ruang yang lebih luas.', text: 'Sroyo memiliki wilayah terluas di antara ketiganya. Jumlah penduduknya tetap lebih sedikit dibanding Ngringo: 10.470 jiwa.' },
  ];
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(()=>{
    if (reduced) return;
    const ctx = gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('.story-chapter').forEach((el, index) => {
        ScrollTrigger.create({ trigger: el, start: 'top 65%', end: 'bottom 40%', onEnter: () => setChapter(index), onEnterBack: () => setChapter(index) });
      });
      gsap.to('.story-orbit',{rotation:65,ease:'none',scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:1.3}});
      gsap.to('.story-sun',{y:-60,ease:'none',scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:1}});
      gsap.from('.story-rule',{scaleX:0,transformOrigin:'left',ease:'none',scrollTrigger:{trigger:ref.current,start:'top 65%',end:'bottom 80%',scrub:.8}});
    },ref);
    return ()=>ctx.revert();
  },[reduced]);
  return <section className="story" ref={ref}><div className="story-inner container"><div className="story-art" aria-hidden="true"><svg viewBox="0 0 500 500"><circle className="story-sun" cx="250" cy="225" r="126" fill="#dd7751"/><g className="story-orbit" style={{transformOrigin:'250px 250px'}} fill="none" stroke="#718275" strokeWidth="1"><ellipse cx="250" cy="250" rx="223" ry="147" transform="rotate(-28 250 250)"/><ellipse cx="250" cy="250" rx="190" ry="218" transform="rotate(29 250 250)"/><circle cx="250" cy="250" r="210"/><circle cx="435" cy="153" r="9" fill="#e8d8aa"/></g><path d="M20 372q126-104 240-42t229-22v190H20Z" fill="#75845d"/><path d="M20 420q121-87 270-6t199-37v121H20Z" fill="#c5c78a"/><path d="m58 405 316 62M139 371l276 58M48 447l188 46" stroke="#ebdfb6" strokeWidth="2"/><path d="M265 343q-55 52-16 76t-12 79h64q34-48-20-70t13-76Z" fill="#e9e5cd"/></svg><div className="story-art-data"><span className="eyebrow">{chapters[chapter].name} / DATA 2024</span><AnimatePresence mode="wait" initial={false}><motion.strong key={chapter} initial={{opacity: reduced ? 1 : 0, y: reduced ? 0 : 15}} animate={{opacity:1,y:0}} exit={{opacity: reduced ? 1 : 0, y: reduced ? 0 : -15}} transition={{duration: reduced ? 0 : .25}}>{chapters[chapter].value}<small>{chapters[chapter].unit}</small></motion.strong></AnimatePresence><div className="story-dots">{chapters.map((c,i)=><i key={c.name} className={i===chapter?'active':''}/>)}</div></div></div><div className="story-copy"><h2>Lebih dari<br/>sebuah titik<br/>di <span className="serif italic">peta.</span></h2><div className="story-rule"/><p>Wilayah yang luas tidak selalu berarti penduduk yang lebih banyak. Sroyo memiliki wilayah terluas di antara ketiganya; Ngringo memiliki penduduk terbanyak.</p><div className="story-chapters">{chapters.map((c,i)=><article className={`story-chapter ${chapter===i?'active':''}`} key={c.name}><span className="eyebrow">0{i+1} / {c.name}</span><h3>{c.title}</h3><p>{c.text}</p><span className="story-chapter-number">{c.value} {c.unit} · 2024</span></article>)}</div><SourceButton dark onClick={()=>showSource('bps')}/><br/><Link className="text-link" to="/#bandingkan">Temukan perbedaannya <ArrowRight size={17}/></Link></div></div></section>;
}
function Comparison({ showSource }: { showSource: (id: string) => void }) {
  const [metricIndex,setMetricIndex] = useState(0);
  const [selected,setSelected] = useState<VillageSlug[]>(['dagen','ngringo','sroyo']);
  const reduced = useReducedMotion();
  const metric = metrics[metricIndex];
  const shown = villages.filter(v=>selected.includes(v.slug));
  const max = Math.max(...villages.map(v=>v[metric.key]));
  return <section className="comparison section-space" id="bandingkan"><div className="container"><div className="section-heading" data-reveal><div><h2>Tiga desa.<br/><span className="serif italic">Perspektif berbeda.</span></h2></div><div><SourceButton dark onClick={()=>showSource('bps')}/></div></div><div className="comparison-controls"><div className="metric-tabs" aria-label="Metrik perbandingan">{metrics.map((m,i)=><button key={m.key} onClick={()=>setMetricIndex(i)} aria-pressed={i===metricIndex} className={i===metricIndex?'selected':''}>{m.label}</button>)}</div><div className="village-toggles" aria-label="Desa yang dibandingkan">{villages.map(v=><button key={v.slug} onClick={()=>setSelected(prev=>prev.includes(v.slug)?prev.length>1?prev.filter(s=>s!==v.slug):prev:[...prev,v.slug])} aria-pressed={selected.includes(v.slug)} aria-label={`${selected.includes(v.slug)?'Sembunyikan':'Tampilkan'} ${v.name}`} disabled={selected.length===1 && selected.includes(v.slug)}>{selected.includes(v.slug)?<Check size={13}/>:<Plus size={13}/>} {v.name}</button>)}</div></div><div className="chart-label"><span>{metric.label.toUpperCase()}</span><span>DALAM {metric.unit.toUpperCase()} · 2024</span></div><div className="comparison-chart" aria-live="polite"><AnimatePresence initial={false}>{shown.map(v=><motion.div key={v.slug} className="chart-row" layout={!reduced} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,height:0}} transition={{duration:reduced?0:.35}}><Link to={`/desa/${v.slug}`} className="chart-name">{v.name}<ArrowUpRight size={15}/></Link><div className="bar-track"><motion.div className={`bar bar-${v.slug}`} initial={false} animate={{width:`${v[metric.key]/max*100}%`}} transition={{duration:reduced?0:.85,ease}}/><span className="bar-grid"/></div><strong>{format(v[metric.key],metric.decimals)}<small>{metric.unit}</small></strong></motion.div>)}</AnimatePresence></div><details className="data-table-details"><summary>Lihat semua angka dalam tabel <Plus size={16}/></summary><div className="table-scroll" tabIndex={0} role="region" aria-label="Tabel perbandingan desa"><table><caption>Data 2024 · BPS Kabupaten Karanganyar</caption><thead><tr><th scope="col">Desa</th>{metrics.map(m=><th scope="col" key={m.key}>{m.label}{m.key==='area'?' (ha)':''}</th>)}</tr></thead><tbody>{villages.map(v=><tr key={v.slug}><th scope="row">{v.name}</th>{metrics.map(m=><td key={m.key}>{format(v[m.key],m.decimals)}</td>)}</tr>)}</tbody></table></div></details></div></section>;
}
function VillagePage({ showSource }: { showSource: (id: string) => void }) {
  const {slug} = useParams();
  const v = villages.find(v=>v.slug===slug);
  const [active,setActive] = useState('profil');
  const reduced = useReducedMotion();
  useEffect(()=>{
    const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id);});},{rootMargin:'-15% 0px -60% 0px',threshold:0});
    document.querySelectorAll('.village-section').forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[slug]);
  if(!v) return <NotFound/>;
  const index = villages.indexOf(v);
  const archive = sources.filter(s=>v.sources.includes(s.id)&&s.kind==='Arsip');
  const sections = [{id:'profil',name:'Sekilas'},{id:'wilayah',name:'Wilayah & penduduk'},{id:'dokumen',name:'Dokumen desa'},{id:'peta',name:'Peta desa'},{id:'galeri',name:'Galeri foto'}];
  return <Page title={`Profil Desa ${v.name} — Jaten`} description={`Kenali Desa ${v.name}, Kecamatan Jaten, melalui data wilayah dan penduduk tahun 2024 serta rujukan dokumen desa.`}><div style={{'--village-color':v.accent,'--village-light':v.light} as CSSProperties}>
    <section className="village-hero container"><div><Link to="/#jelajah" className="breadcrumb hero-reveal"><ArrowLeft size={14}/> Semua desa <span>/</span> {v.name}</Link><h1><span className="hero-title-mask"><span className="hero-title-line">{v.name}<span className="village-title-dot">.</span></span></span></h1><p className="village-hero-text hero-reveal">{v.description}</p><div className="village-location hero-reveal"><MapPin size={16}/> Jaten, Karanganyar, Jawa Tengah</div><SourceButton onClick={()=>showSource('bps')}/></div><div className="hero-art village-hero-art"><Landscape variant={index}/><span className="village-art-number">{v.number}</span></div></section>
    <nav className="section-nav" aria-label="Bagian profil"><div className="container">{sections.map((s,i)=><a key={s.id} href={`#${s.id}`} className={active===s.id?'active':''} aria-current={active===s.id?'location':undefined}><span>0{i+1}</span>{s.name}</a>)}<span className="nav-village-name">{v.name.toUpperCase()} / 2024</span></div></nav>
    <section id="profil" className="village-section profile-intro container section-space"><div data-reveal><h2>{v.headline.split('\n')[0]}<br/><span className="serif italic">{v.headline.split('\n')[1]}</span></h2></div><div data-reveal><p className="large-body">{v.editorial}</p><SourceButton onClick={()=>showSource('bps')}/></div></section>
    <section id="wilayah" className="village-section demographics section-space"><div className="container"><div className="section-heading" data-reveal><div><h2>Kehidupan,<br/>dalam <span className="serif italic">angka.</span></h2></div><SourceButton onClick={()=>showSource('bps')}/></div><div className="profile-stats" data-reveal>{[{value:format(v.area,2),label:'Luas wilayah',unit:'hektare'},{value:format(v.population),label:'Jumlah penduduk',unit:'jiwa'},{value:format(v.density),label:'Kepadatan penduduk',unit:'jiwa / km²'}].map(s=><div key={s.label}><span className="eyebrow">{s.label}</span><strong>{s.value}</strong><span>{s.unit} · data 2024</span></div>)}</div><div className="population-detail"><div data-reveal><h3>Komposisi penduduk</h3><div className="gender-chart" role="img" aria-label={`Penduduk laki-laki ${format(v.male)}, perempuan ${format(v.female)}, data 2024`}><motion.div initial={false} animate={{width:`${v.male/v.population*100}%`}} transition={{duration:reduced?0:1}} className="gender-male"/><div className="gender-female"/></div><div className="gender-labels"><div><span><i className="male-dot"/> Laki-laki</span><strong>{format(v.male)}</strong><small>{format(v.male/v.population*100,1)}%</small></div><div><span><i className="female-dot"/> Perempuan</span><strong>{format(v.female)}</strong><small>{format(v.female/v.population*100,1)}%</small></div></div><SourceButton onClick={()=>showSource('bps')}/></div><div className="administration" data-reveal><h3>Bagian-bagian desa</h3>{[{label:'Dusun',value:v.dusun},{label:'Rukun Warga',value:v.rw},{label:'Rukun Tetangga',value:v.rt}].map((a,i)=><div className="admin-row" key={a.label}><span className="admin-index">0{i+1}</span><span>{a.label}</span><strong>{a.value}</strong></div>)}<SourceButton onClick={()=>showSource('bps')}/></div></div></div></section>
    <section id="dokumen" className="village-section container section-space"><div className="section-heading" data-reveal><div><h2>Jejak yang<br/>bisa <span className="serif italic">dibaca.</span></h2></div></div><div className="archive-list">{archive.map(s=><button className="archive-row" key={s.id} onClick={()=>showSource(s.id)} data-reveal><BookOpen size={24} strokeWidth={1.3}/><div><span className="eyebrow">{s.year}</span><h3>{s.title}</h3><p>{s.scope}</p></div><ArrowUpRight size={24}/></button>)}</div></section>
    <VillageMap village={v.slug} showSource={showSource}/>
    <PhotoGallery village={v.slug} showSource={showSource}/>
    <section className="next-village"><div className="container"><Link to={`/desa/${villages[(index+1)%3].slug}`}><span>{villages[(index+1)%3].name}<span className="serif italic"> berikutnya.</span></span><ArrowUpRight/></Link><Link className="text-link" to="/#jelajah">Kembali ke semua desa <ArrowLeft size={16}/></Link></div></section>
    </div></Page>;
}
function SourcesPage({ showSource }: { showSource: (id:string)=>void }) {
  const [filter,setFilter] = useState('Semua');
  return <Page title="Sumber Data — Atlas Desa Jaten" description="Sumber statistik dan arsip untuk Dagen, Ngringo, dan Sroyo. Telusuri penerbit, tahun data, serta batas informasi."><section className="sources-hero container"><h1 aria-label="Informasi jelas. Sumber terbuka."><span className="hero-title-mask"><span className="hero-title-line">Informasi jelas.</span></span><span className="hero-title-mask"><span className="hero-title-line">Sumber <span className="serif italic">terbuka.</span></span></span></h1><p className="large-body hero-reveal">Setiap angka punya tahun. Setiap dokumen punya konteks.<br/>Di sini, kamu bisa menelusuri keduanya.</p></section><section className="container sources-content"><div className="sources-toolbar"><div className="light-tabs" aria-label="Filter sumber">{['Semua','Statistik','Arsip','Peta','Potensi','Foto'].map(f=><button key={f} aria-pressed={filter===f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div></div><div className="source-list">{sources.filter(s=>filter==='Semua'||s.kind===filter).map((s,i)=><button className="source-row" key={s.id} onClick={()=>showSource(s.id)}><span className="source-index">{String(i+1).padStart(2,'0')}</span><div><span className="eyebrow">{s.kind} / {s.year}</span><h2>{s.title}</h2><p>{s.publisher}</p></div><ArrowUpRight size={24}/></button>)}</div><div className="methodology section-space" data-reveal><div><h2>Data dengan <span className="serif italic">konteks.</span></h2><div className="method-grid"><div><span>01</span><h3>Tahun data tetap terlihat</h3><p>Statistik memakai data 2024 dari publikasi BPS 2025. Tahun publikasi berbeda dari tahun data.</p></div><div><span>02</span><h3>Tiga desa, bukan seluruh Jaten</h3><p>Akumulasi dihitung dari Dagen, Ngringo, dan Sroyo. Perbandingan dan persentase hanya memakai cakupan ini.</p></div><div><span>03</span><h3>Arsip dibaca sebagai arsip</h3><p>Dokumen lama tidak dipakai untuk menyatakan pejabat aktif. Informasi kontak dan layanan yang belum dikonfirmasi tidak diterbitkan.</p></div><div><span>04</span><h3>Ilustrasi, bukan geografi</h3><p>Lanskap adalah karya grafis orisinal untuk atlas ini. Bentuk gunung, sungai, dan permukiman tidak menunjukkan lokasi atau batas desa sebenarnya.</p></div></div><p className="fine-print">Rujukan statistik dan arsip dihimpun pada 1 Oktober 2026; sumber lokasi ditambahkan 5 Oktober 2026. Dokumen eksternal belum seluruhnya diverifikasi ulang; ketersediaan mengikuti portal penerbit. Tidak ada data pribadi penduduk yang dihimpun.</p></div></div></section></Page>;
}
function NotFound() { return <Page title="Halaman Tidak Ditemukan — Jaten" description="Kembali ke Atlas Desa Jaten untuk menjelajahi Dagen, Ngringo, dan Sroyo."><section className="not-found container"><span className="eyebrow">404 / DI LUAR ATLAS</span><h1>Jalan ini belum<br/>ada di <span className="serif italic">atlas.</span></h1><p>Kembali ke beranda untuk menjelajahi ketiga desa.</p><Link to="/" className="button primary">Kembali ke beranda <ArrowRight size={17}/></Link></section></Page>; }

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const [source,setSource] = useState<Source|null>(null);
  const showSource = (id:string) => setSource(sources.find(s=>s.id===id)??null);
  useEffect(()=>{
    if(location.hash) {
      const timer = window.setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:reduced?'instant':'smooth'}),350);
      return ()=>window.clearTimeout(timer);
    }
    window.scrollTo({top:0,behavior:'instant'});
    setSource(null);
  },[location.pathname,location.hash,reduced]);
  return <><motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true"/><a className="skip-link" href="#main">Lewati ke konten</a><Header/><main id="main" tabIndex={-1}><AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname} initial={{opacity:reduced?1:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:reduced?1:0,y:reduced?0:-8}} transition={{duration:reduced?0:.24,ease}}><Routes location={location}><Route path="/" element={<Home showSource={showSource}/>}/><Route path="/desa/:slug" element={<VillagePage showSource={showSource}/>}/><Route path="/sumber" element={<SourcesPage showSource={showSource}/>}/><Route path="*" element={<NotFound/>}/></Routes></motion.div></AnimatePresence></main><Footer/><SourceDialog source={source} close={()=>setSource(null)}/></>;
}
