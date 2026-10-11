"use client";

import { motion } from "motion/react";
import { LineIcon } from "./LineButton";

export default function Cta() {
  return (
    <section id="quote" className="scroll-mt-24 px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-filament px-6 py-16 text-white md:px-16 md:py-24"
      >
        {/* Stacked "layers" decoration */}
        <div className="pointer-events-none absolute -right-10 bottom-0 hidden flex-col items-end gap-1.5 md:flex" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (11 - i) * 0.06, duration: 0.5, ease: "easeOut" }}
              className="block h-3 origin-right rounded-full bg-white/20"
              style={{ width: 120 + i * 22 }}
            />
          ))}
        </div>

        <p className="font-mono text-xs tracking-widest text-white/80">{"// พร้อมเมื่อคุณพร้อม"}</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-6xl">
          ส่งไฟล์มา รู้ราคาภายใน 10 นาที
        </h2>
        <p className="mt-4 max-w-lg text-white/85">
          แอดไลน์แล้วส่งไฟล์ได้เลย หรือโทรคุยกับทีมงาน เปิดทุกวัน 9:00–19:00 น.
        </p>

        <div className="relative mt-10 flex flex-col gap-3 sm:flex-row">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-full bg-line-green px-6 py-3.5 font-semibold text-white shadow-lg shadow-black/10"
          >
            <LineIcon className="size-5" />
            แอดไลน์ @layer3d
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-paper"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
            </svg>
            โทร 02-000-0000
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
