"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import HeroCanvas from "./three/HeroCanvas";

const headline = ["ไอเดียในหัว", "พิมพ์ออกมา", "จับต้องได้จริง"];

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-line", { yPercent: 115, duration: 1.2, stagger: 0.12, delay: 0.2 })
          .from(".hero-fade", { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.8")
          .from(".hero-spec", { opacity: 0, x: -12, duration: 0.6, stagger: 0.06 }, "-=0.6");

        // Headline drifts and fades as you scroll past the hero
        gsap.to(".hero-copy", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="top"
      className="bg-blueprint relative isolate overflow-hidden pt-28 pb-16 md:min-h-svh md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(234,88,12,0.16),transparent_55%),linear-gradient(to_bottom,transparent_60%,var(--ink))]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1.05fr_1fr]">
        <div className="hero-copy">
          <p className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/70 px-3 py-1 text-xs text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-filament" />
            เครื่องพิมพ์ 12 เครื่อง พร้อมรับงาน · กรุงเทพฯ
          </p>

          <h1 className="font-display text-5xl leading-[1.15] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {headline.map((line, i) => (
              <span key={line} className="-my-[0.15em] block overflow-hidden py-[0.15em]">
                <span className={`hero-line block ${i === 2 ? "text-filament" : ""}`}>{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-md text-lg text-muted">
            รับปริ้นท์ 3 มิติ งานต้นแบบ ชิ้นงานใช้จริง และงานล็อตผลิต สำหรับเมกเกอร์ สตาร์ทอัพ
            และสตูดิโอออกแบบ ส่งไฟล์ทางไลน์ รู้ราคาในไม่กี่นาที ได้ของใน 2–3 วัน
          </p>

          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <motion.a
              href="#quote"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-filament px-6 py-3 font-semibold text-white shadow-[0_12px_32px_-12px_var(--filament)]"
            >
              ส่งไฟล์ขอราคา
            </motion.a>
            <motion.a
              href="#materials"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-line bg-ink-2 px-6 py-3 font-medium text-paper hover:bg-ink-3"
            >
              ดูวัสดุทั้งหมด
            </motion.a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 text-xs">
            {[
              ["ความละเอียด", "0.05 mm"],
              ["พื้นที่พิมพ์", "350³ mm"],
              ["ได้ของใน", "48 ชม."],
            ].map(([k, v]) => (
              <div key={k} className="hero-spec">
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-mono text-base text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[380px] sm:h-[460px] lg:h-[600px]">
          <HeroCanvas />
          <span className="pointer-events-none absolute right-2 bottom-4 font-mono text-[10px] tracking-widest text-muted">
            LIVE PREVIEW · VASE_TWIST.STL
          </span>
        </div>
      </div>
    </section>
  );
}
