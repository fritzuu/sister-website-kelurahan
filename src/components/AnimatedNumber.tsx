import { useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import { format } from '../content/villages';

/** GSAP owns only the text; the accessible value stays final throughout the count. */
export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, { value, duration: 1.25, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 94%', once: true }, onStart: () => { node.textContent = format(0, decimals); }, onUpdate: () => { node.textContent = format(decimals ? counter.value : Math.round(counter.value), decimals); } });
    });
    return () => { ctx.revert(); node.textContent = format(value, decimals); };
  }, [value, decimals, reduced]);
  return <strong aria-label={format(value, decimals)}><span aria-hidden="true" ref={ref}>{format(value, decimals)}</span></strong>;
}
