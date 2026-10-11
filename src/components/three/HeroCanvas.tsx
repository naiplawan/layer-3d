"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const PrinterScene = dynamic(() => import("./PrinterScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs tracking-widest text-muted">
      HEATING NOZZLE…
    </div>
  ),
});

export default function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const reducedMotion = useReducedMotion() ?? false;

  // Stop rendering frames while the hero is off-screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      <PrinterScene active={active} reducedMotion={reducedMotion} />
    </div>
  );
}
