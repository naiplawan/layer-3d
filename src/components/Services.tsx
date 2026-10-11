"use client";

import { motion, type Variants } from "motion/react";
import type { MouseEvent } from "react";
import Image from "next/image";

const services = [
  {
    tag: "01",
    image: "/images/services/prototyping.png",
    en: "RAPID PROTOTYPING",
    title: "งานต้นแบบด่วน",
    body: "ลองทรง ลองขนาด ได้ชิ้นงานภายในคืนเดียว พิมพ์ FDM จากไฟล์เดียว รับของได้เช้าวันถัดไป",
    meta: "เริ่ม 24 ชม.",
  },
  {
    tag: "02",
    image: "/images/services/production.png",
    en: "PRODUCTION RUNS",
    title: "งานผลิตเป็นล็อต",
    body: "ผลิต 50–5,000 ชิ้น ขนาดแม่นยำเท่ากันทุกชิ้น มีรายงาน QC ทุกล็อต ยิ่งสั่งเยอะ ราคาต่อชิ้นยิ่งถูก",
    meta: "±0.1 mm",
  },
  {
    tag: "03",
    image: "/images/services/resin.png",
    en: "RESIN DETAIL",
    title: "งานเรซิ่นละเอียดสูง",
    body: "โมเดลจิ๋ว ต้นแบบจิวเวลรี่ และโมเดลฟัน ความละเอียด 25 ไมครอน ผิวเนียน พร้อมทำสีต่อได้ทันที",
    meta: "25 µm",
  },
  {
    tag: "04",
    image: "/images/services/design.png",
    en: "DESIGN & REPAIR",
    title: "ออกแบบและซ่อมชิ้นส่วน",
    body: "ไม่มีไฟล์ CAD ก็ไม่เป็นไร ส่งรูปสเก็ตช์หรือชิ้นส่วนที่แตกมา ทีมวิศวกรขึ้นโมเดล พิมพ์ และจัดส่งให้ครบ",
    meta: "รวมค่าออกแบบ",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Spotlight follows the cursor inside each card
function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs tracking-widest text-filament-soft">{"// บริการของเรา · SERVICES"}</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-5xl">
            ครบจบในที่เดียว ตั้งแต่สเก็ตช์แรก จนถึงงานล็อตใหญ่
          </h2>
        </div>
        <p className="max-w-sm text-muted">
          ทุกออเดอร์มีวิศวกรตรวจไฟล์ก่อนขึ้นเครื่อง ไม่มีงานเสีย ไม่มีค่าใช้จ่ายแอบแฝง
        </p>
      </div>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {services.map((s) => (
          <motion.li
            key={s.tag}
            variants={card}
            whileHover={{ y: -6 }}
            onMouseMove={trackPointer}
            className="group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-8"
          >
            <div className="relative -mx-8 -mt-8 mb-8 aspect-[3/2] overflow-hidden border-b border-line">
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(320px_circle_at_var(--x)_var(--y),rgba(234,88,12,0.10),transparent_70%)]" />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-xs tracking-widest text-muted">{s.tag} · {s.en}</span>
              <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-filament-soft">
                {s.meta}
              </span>
            </div>
            <h3 className="relative mt-6 font-display text-2xl font-semibold">{s.title}</h3>
            <p className="relative mt-3 text-muted">{s.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
