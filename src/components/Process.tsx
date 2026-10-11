"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    n: "01",
    title: "ส่งไฟล์",
    en: "UPLOAD",
    body: "ส่งไฟล์ STL, OBJ, 3MF หรือ STEP ทางเว็บหรือไลน์ ระบบเช็คความหนาผนังและส่วนยื่นให้อัตโนมัติ",
  },
  {
    n: "02",
    title: "เช็คราคา",
    en: "QUOTE",
    body: "เลือกวัสดุ สี และความหนาแน่นได้เอง ราคาอัปเดตทันที ไม่ต้องรออีเมลตอบกลับ",
  },
  {
    n: "03",
    title: "พิมพ์งาน",
    en: "PRINT",
    body: "วิศวกรตรวจไฟล์ก่อนส่งเข้าเครื่อง ติดตามสถานะงานได้ตลอดผ่านไลน์",
  },
  {
    n: "04",
    title: "เก็บงานและจัดส่ง",
    en: "FINISH & SHIP",
    body: "แกะซัพพอร์ต ขัดผิว ทำผิวเรียบ หรือทำสี แพ็คอย่างดี ส่งด่วนทั่วประเทศ",
  },
];

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the steps horizontally
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.5}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(el, { x: () => -distance(), ease: "none" }, 0).fromTo(
          ".process-bar",
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
      });

      // Mobile: simple staggered reveal
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
          gsap.from(step, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%" },
          });
        });
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="process"
      className="relative flex scroll-mt-24 flex-col justify-center overflow-hidden border-y border-line bg-ink-3 py-24 md:h-svh md:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <p className="font-mono text-xs tracking-widest text-filament-soft">{"// ขั้นตอนการสั่งงาน · HOW IT WORKS"}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-5xl">
          จากไฟล์ในคอม สู่ชิ้นงานจริง ใน 4 ขั้นตอน
        </h2>

        <div className="mt-10 hidden h-px w-full bg-line md:block">
          <div className="process-bar h-full origin-left bg-filament" />
        </div>
      </div>

      <ol
        ref={track}
        className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-4 px-4 md:flex-row md:gap-6 md:overflow-visible"
      >
        {steps.map((s) => (
          <li
            key={s.n}
            className="process-step relative shrink-0 rounded-3xl border border-line bg-ink-2 p-8 shadow-sm md:w-[min(440px,42vw)]"
          >
            <span className="font-display text-7xl font-semibold text-transparent [-webkit-text-stroke:1.5px_var(--filament)] md:text-8xl">
              {s.n}
            </span>
            <p className="mt-6 font-mono text-xs tracking-widest text-muted">{s.en}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-muted">{s.body}</p>
            <span className="absolute top-8 right-8 size-2 rounded-full bg-filament shadow-[0_0_12px_var(--filament)]" />
          </li>
        ))}
      </ol>
    </section>
  );
}
