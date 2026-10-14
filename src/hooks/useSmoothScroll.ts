import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
}
let globalLenisInstance: Lenis | null = null;
export const getLenis = (): Lenis | null => globalLenisInstance;
export const scrollToElement = (target: string | HTMLElement, options?: {
  offset?: number; duration?: number; immediate?: boolean; onComplete?: () => void;
}) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (globalLenisInstance && !reduced) {
    globalLenisInstance.scrollTo(target, { offset: options?.offset ?? -110, duration: options?.duration ?? 1, immediate: options?.immediate ?? false, onComplete: options?.onComplete });
  } else {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + (options?.offset ?? -110), behavior: reduced || options?.immediate ? 'instant' : 'smooth' });
    options?.onComplete?.();
  }
};
export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      if (globalLenisInstance === lenisRef.current) globalLenisInstance = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
    const sync = () => {
      stop();
      if (preference.matches) return;
      const lenis = new Lenis({ duration: options.duration ?? 1, easing: options.easing, smoothWheel: options.smoothWheel ?? true });
      lenisRef.current = globalLenisInstance = lenis;
      const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
    };
    sync();
    preference.addEventListener('change', sync);
    return () => { preference.removeEventListener('change', sync); stop(); };
  }, [options.duration, options.easing, options.smoothWheel]);
  return { lenis: lenisRef.current, scrollTo: scrollToElement };
};
