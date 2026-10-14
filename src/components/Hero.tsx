import React from 'react';
import { ArrowDown, ArrowUpRight, FileText, Github, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroBackground3D } from './canvas/HeroBackground3D';
import { scrollToElement } from '../hooks/useSmoothScroll';

export const Hero: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume }) => {
  const reducedMotion = useReducedMotion();
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-name-heading">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-layout">
        <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="hero-availability"><span />{PERSONAL_INFO.status}</div>
          <p className="hero-eyebrow">FULL-STACK DEVELOPER / AI ENGINEER</p>
          <h1 id="hero-name-heading">Nagarjuna<br /><span>Reddy.</span></h1>
          <h2>I turn complex ideas into<br className="hidden sm:block" /> useful digital experiences.</h2>
          <p className="hero-description">From intelligent AI assistants to full-stack web apps, I build with Python, React, and a curiosity for what comes next.</p>
          <div className="hero-actions">
            <button id="hero-explore-btn" className="hero-primary" onClick={() => scrollToElement('#projects')} >Explore my work <ArrowUpRight size={18} /></button>
            <button id="hero-resume-btn" className="hero-secondary" onClick={onOpenResume}><FileText size={17} /> View resume</button>
          </div>
          <div className="hero-meta"><span><MapPin size={14} />{PERSONAL_INFO.location}</span><a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a></div>
        </motion.div>
        <motion.div className="hero-art" initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="hero-art-glow" aria-hidden="true" />
          <div className="hero-art-top"><span className="font-mono">01 / IDEAS INTO REALITY</span><span className="hero-live-dot" /></div>
          <HeroBackground3D />
          <div className="hero-orbit-label hero-orbit-label-one">&lt;/&gt; React + TypeScript</div>
          <div className="hero-orbit-label hero-orbit-label-two">✦ Applied AI</div>
          <div className="hero-profile"><img src={PERSONAL_INFO.profilePhoto} alt={PERSONAL_INFO.fullName} width="44" height="44" /><div><strong>Creative mind. Engineering focus.</strong><span>Building at the intersection of code & AI</span></div></div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <div className="hero-stats">{PERSONAL_INFO.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <button className="hero-scroll" onClick={() => scrollToElement('#about')}>Discover more <ArrowDown size={16} /></button>
      </div>
    </section>
  );
};
