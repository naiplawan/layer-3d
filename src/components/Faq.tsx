"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    q: "รับไฟล์นามสกุลอะไรบ้าง?",
    a: "STL, OBJ, 3MF และ STEP ถ้ามีแค่รูปสเก็ตช์ รูปถ่าย หรือชิ้นส่วนที่แตก ทีมออกแบบของเราขึ้นโมเดลให้ได้",
  },
  {
    q: "ชิ้นงานแม่นยำแค่ไหน?",
    a: "งาน FDM คลาดเคลื่อนประมาณ ±0.1 mm งานเรซิ่นประมาณ ±0.05 mm ถ้ามีขนาดสำคัญ แจ้งให้วัด QC เพิ่มได้",
  },
  {
    q: "ถ้างานเสีย หรือใส่ไม่พอดี ทำอย่างไร?",
    a: "ทุกไฟล์ผ่านการตรวจโดยวิศวกรก่อนพิมพ์ หากงานเสียจากฝั่งเรา พิมพ์ใหม่ให้ฟรีทันที",
  },
  {
    q: "ส่งต่างจังหวัดได้ไหม?",
    a: "ได้ ส่งด่วนทั่วประเทศ ได้ของภายใน 1–2 วัน หรือนัดรับงานที่สตูดิโอก็ได้",
  },
  {
    q: "ออกใบกำกับภาษีได้ไหม?",
    a: "ได้ ออกใบกำกับภาษีเต็มรูปแบบ และรับวางบิลสำหรับลูกค้านิติบุคคล",
  },
  {
    q: "ไฟล์งานของฉันปลอดภัยไหม?",
    a: "ไฟล์ทั้งหมดเก็บแบบเข้ารหัส ลบอัตโนมัติภายใน 90 วัน และยินดีเซ็น NDA ก่อนส่งไฟล์",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-4 py-24 md:grid-cols-[1fr_1.4fr] md:py-32">
      <div>
        <p className="font-mono text-xs tracking-widest text-filament-soft">{"// คำถามที่พบบ่อย · FAQ"}</p>
        <h2 className="mt-3 font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-5xl">
          มีคำถาม? เราตอบให้
        </h2>
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium"
              >
                {f.q}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-ink-2 text-filament"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
