"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type Material = {
  id: string;
  name: string;
  tech: string;
  blurb: string;
  bestFor: string[];
  swatch: string;
  image: string;
  specs: { label: string; value: number }[];
};

const materials: Material[] = [
  {
    id: "pla",
    image: "/images/materials/pla.png",
    name: "PLA",
    tech: "FDM",
    blurb: "วัสดุยอดนิยม รายละเอียดคม สีให้เลือกเยอะ และเป็นวิธีที่ประหยัดที่สุดในการเปลี่ยนไอเดียเป็นของจริง",
    bestFor: ["โมเดลคอนเซ็ปต์", "ของโชว์", "จิ๊กและฟิกซ์เจอร์"],
    swatch: "#ff6a1a",
    specs: [
      { label: "ความแข็งแรง", value: 55 },
      { label: "ทนความร้อน", value: 25 },
      { label: "ความละเอียด", value: 70 },
      { label: "ความยืดหยุ่น", value: 15 },
    ],
  },
  {
    id: "petg",
    image: "/images/materials/petg.png",
    name: "PETG",
    tech: "FDM",
    blurb: "เหนียว ทนทาน ปลอดภัยต่ออาหาร ยืดหยุ่นเล็กน้อย ตัวเลือกที่ปลอดภัยสำหรับชิ้นงานใช้งานจริง",
    bestFor: ["กล่องอุปกรณ์", "ขายึด", "งานกลางแจ้ง"],
    swatch: "#3fa7ff",
    specs: [
      { label: "ความแข็งแรง", value: 68 },
      { label: "ทนความร้อน", value: 45 },
      { label: "ความละเอียด", value: 60 },
      { label: "ความยืดหยุ่น", value: 35 },
    ],
  },
  {
    id: "tpu",
    image: "/images/materials/tpu.png",
    name: "TPU 95A",
    tech: "FDM",
    blurb: "นิ่มเหมือนยาง แทบไม่มีวันพัง บีบ งอ แล้วคืนตัวได้ทุกครั้ง",
    bestFor: ["ซีลยาง", "เคสโทรศัพท์", "ของสวมใส่"],
    swatch: "#7ee081",
    specs: [
      { label: "ความแข็งแรง", value: 50 },
      { label: "ทนความร้อน", value: 40 },
      { label: "ความละเอียด", value: 45 },
      { label: "ความยืดหยุ่น", value: 95 },
    ],
  },
  {
    id: "nylon",
    image: "/images/materials/nylon-cf.png",
    name: "Nylon CF",
    tech: "FDM",
    blurb: "ไนลอนผสมคาร์บอนไฟเบอร์ แข็ง เบา ผิวดำด้าน ใช้แทนชิ้นงานอะลูมิเนียมกลึงได้",
    bestFor: ["เฟรมโดรน", "เครื่องมือช่าง", "ชิ้นส่วนใช้งานจริง"],
    swatch: "#8a8f99",
    specs: [
      { label: "ความแข็งแรง", value: 92 },
      { label: "ทนความร้อน", value: 80 },
      { label: "ความละเอียด", value: 55 },
      { label: "ความยืดหยุ่น", value: 20 },
    ],
  },
  {
    id: "resin",
    image: "/images/materials/resin.png",
    name: "Tough Resin",
    tech: "SLA",
    blurb: "ผิวงานเหมือนงานฉีดพลาสติก ความละเอียด 25 ไมครอน แทบไม่เห็นรอยเลเยอร์ ขอบคมกริบ",
    bestFor: ["โมเดลจิ๋ว", "ต้นแบบจิวเวลรี่", "ชิ้นงานล็อคสแนป"],
    swatch: "#c9b8ff",
    specs: [
      { label: "ความแข็งแรง", value: 65 },
      { label: "ทนความร้อน", value: 50 },
      { label: "ความละเอียด", value: 98 },
      { label: "ความยืดหยุ่น", value: 30 },
    ],
  },
];

export default function Materials() {
  const [activeId, setActiveId] = useState(materials[0].id);
  const active = materials.find((m) => m.id === activeId)!;

  return (
    <section id="materials" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <p className="font-mono text-xs tracking-widest text-filament-soft">{"// วัสดุ · MATERIALS"}</p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-5xl">
        เลือกวัสดุให้เหมาะกับงาน
      </h2>

      <div
        role="tablist"
        aria-label="วัสดุ"
        className="mt-10 flex gap-1 overflow-x-auto rounded-full border border-line bg-ink-2 p-1 [scrollbar-width:none]"
      >
        {materials.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={m.id === activeId}
            onClick={() => setActiveId(m.id)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              m.id === activeId ? "text-white" : "text-muted hover:text-paper"
            }`}
          >
            {m.id === activeId && (
              <motion.span
                layoutId="material-pill"
                className="absolute inset-0 rounded-full bg-filament"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{m.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid gap-6 rounded-3xl border border-line bg-ink-2 p-6 md:grid-cols-[auto_1fr_1fr] md:p-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line md:w-56"
          >
            <Image
              src={active.image}
              alt={`ตัวอย่างวัสดุ ${active.name}`}
              fill
              sizes="(min-width: 768px) 224px, 100vw"
              className="object-cover"
            />
          </motion.div>

          <div>
            <div className="flex items-baseline gap-3">
              <h3 className="font-display text-3xl font-semibold">{active.name}</h3>
              <span className="font-mono text-xs text-muted">{active.tech}</span>
            </div>
            <p className="mt-3 text-muted">{active.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {active.bestFor.map((b) => (
                <li key={b} className="rounded-full border border-line px-3 py-1 text-xs text-paper">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <dl className="space-y-4">
            {active.specs.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between font-mono text-xs">
                  <dt className="text-muted">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: active.swatch }}
                  />
                </div>
              </div>
            ))}
          </dl>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
