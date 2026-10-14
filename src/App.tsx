import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleDashed, X, Menu } from 'lucide-react';
import { PERSONAL_INFO } from './data/portfolioData';
import { GalleryScene, COLLECTIONS } from './components/canvas/GalleryScene';
import type { Panel } from './components/PortfolioDetails';
const SECTIONS = ['About','Skills','Work','Journey','Certifications','GitHub','Resume','Contact'] as const;
const PortfolioDetails = lazy(() => import('./components/PortfolioDetails').then(module => ({default: module.PortfolioDetails})));
import type { Project } from './types';

export default function App() {
  const [index,setIndex]=useState(0);
  const [overview,setOverview]=useState(false);
  const [panel,setPanel]=useState<Panel|null>(null);
  const [opening,setOpening]=useState<Panel|null>(null);
  const [menu,setMenu]=useState(false);
  const [project,setProject]=useState<Project|null>(null);
  const reduced=!!useReducedMotion();
  const dialog=useRef<HTMLDialogElement>(null);
  const selected=COLLECTIONS[((index%3)+3)%3];
  const step=(direction:number)=>setIndex(value=>value+direction);
  const open=(value:Panel)=>{setMenu(false);setProject(null);if(reduced)setPanel(value);else setOpening(value);};
  const navigate=(value:Panel)=>{setProject(null);setPanel(value);dialog.current?.scrollTo({top:0,behavior:'instant'});};
  useEffect(()=>{
    if(!opening)return;
    const timer=window.setTimeout(()=>{setPanel(opening);setOpening(null);},650);
    return()=>clearTimeout(timer);
  },[opening]);
  useEffect(()=>{if(panel)dialog.current?.showModal();else dialog.current?.close();},[panel]);
  useEffect(()=>{
    const keys=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){setMenu(false);setOpening(null);}
      if(panel || opening || event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement)return;
      if(event.key==='ArrowRight'){event.preventDefault();setIndex(v=>v+1);}
      if(event.key==='ArrowLeft'){event.preventDefault();setIndex(v=>v-1);}
    };
    window.addEventListener('keydown',keys);return()=>window.removeEventListener('keydown',keys);
  },[panel,opening]);
  return <main className={`folio ${overview?'is-orbital':''} ${opening?'is-opening':''}`}>
    <header className="intro"><button onClick={()=>open('About')}>Nagarjuna Reddy</button> is a developer & AI engineer from India.</header>
    <button className="index-toggle" onClick={()=>setMenu(v=>!v)} aria-expanded={menu} aria-controls="site-index">{menu?<X size={15}/>:<Menu size={15}/>} Index</button>
    <AnimatePresence>{menu&&<motion.nav id="site-index" className="site-index" aria-label="All portfolio sections" initial={reduced?false:{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>{SECTIONS.map((section,i)=><button key={section} onClick={()=>open(section)}><small>0{i+1}</small>{section}<ArrowUpRight size={15}/></button>)}</motion.nav>}</AnimatePresence>
    <motion.h1 className="masthead" initial={reduced?false:{opacity:0,y:25}} animate={{opacity:overview||opening?0:1,y:overview?-30:0}} transition={{duration:reduced?0:.8,ease:[.22,1,.36,1]}}>PORTFOLIO</motion.h1>
    <GalleryScene index={index} overview={overview} reduced={reduced} active={!panel} explode={!!opening||!!panel} onStep={step} onOpen={i=>open(COLLECTIONS[i].title as Panel)}/>
    {opening&&<div className="opening-title" aria-hidden="true">{opening}</div>}
    <div className="gallery-notes"><span>FULL-STACK DEVELOPMENT & AI ENGINEERING</span><span>HYDERABAD, INDIA</span></div>
    <nav className="collection-nav" aria-label="Portfolio collections">{COLLECTIONS.map((item,i)=><button key={item.title} aria-current={selected.title===item.title?'true':undefined} onClick={()=>setIndex(v=>v+((i-((v%3)+3)%3+4)%3-1))}>{item.title}</button>)}</nav>
    <div className="gallery-dock"><div className="dock-main"><button className="collection-open" onClick={()=>open(selected.title as Panel)} aria-label={`Explore ${selected.title}`}><img src={selected.image} alt=""/><span><small>Collection / 0{((index%3)+3)%3+1}</small><b aria-live="polite">{selected.title}</b></span></button><button className="arrow-button" aria-label="Previous collection" onClick={()=>step(-1)}><ArrowLeft size={16}/></button><button className="arrow-button" aria-label="Next collection" onClick={()=>step(1)}><ArrowRight size={16}/></button></div><button className="mode-button" onClick={()=>setOverview(v=>!v)} aria-label="Toggle orbital view" aria-pressed={overview}><CircleDashed size={24}/></button></div>
    <footer className="home-footer"><div><button onClick={()=>open('About')}>About <ArrowUpRight size={12}/></button><button onClick={()=>open('Resume')}>Resume <ArrowUpRight size={12}/></button><button onClick={()=>open('Contact')}>Contact <ArrowUpRight size={12}/></button></div><span>DRAG TO ROTATE · CLICK TO DISCOVER</span><a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={12}/></a></footer>
    <dialog ref={dialog} className={`detail-dialog ${panel==='Resume'?'is-resume':''}`} onCancel={()=>setPanel(null)} onClose={()=>setPanel(null)} aria-labelledby="detail-title">
      <div className="detail-top"><button className="back-button" onClick={()=>project?setProject(null):setPanel(null)}><ArrowLeft size={16}/>{project?'All projects':'Back to gallery'}</button><span>NAGARJUNA REDDY / {panel}</span><button className="close-button" aria-label="Close details" onClick={()=>setPanel(null)}><X size={22}/></button></div>
      <nav className="detail-nav" aria-label="Portfolio details">{SECTIONS.map(section=><button key={section} aria-current={panel===section?'page':undefined} onClick={()=>navigate(section)}>{section}</button>)}</nav>
      <AnimatePresence mode="wait"><motion.div key={project?.id||panel} className="detail-body" initial={reduced?false:{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.35}}><Suspense fallback={<p role="status">Opening portfolio…</p>}>{panel&&<PortfolioDetails panel={panel} project={project} onNavigate={navigate} onProject={p=>{setProject(p);dialog.current?.scrollTo({top:0,behavior:'instant'});}}/>}</Suspense><div className="detail-footer"><span>BUILDING. LEARNING. CREATING.</span><a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}<ArrowUpRight size={16}/></a><small>© {new Date().getFullYear()} {PERSONAL_INFO.fullName}</small></div></motion.div></AnimatePresence>
    </dialog>
  </main>;
}
