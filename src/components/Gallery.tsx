"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const prints = [
  { src: "/images/gallery/twist-vase.png", title: "แจกันเกลียว", material: "PLA · ส้ม", time: "6 ชม. 40 นาที" },
  { src: "/images/gallery/drone-frame.png", title: "เฟรมโดรน FPV", material: "Nylon CF", time: "9 ชม. 15 นาที" },
  { src: "/images/gallery/miniature-knight.png", title: "โมเดลอัศวินจิ๋ว", material: "Tough Resin", time: "2 ชม. 10 นาที" },
  { src: "/images/gallery/gear-assembly.png", title: "ชุดเฟืองดาวเคราะห์", material: "PETG · ขาว", time: "4 ชม. 5 นาที" },
  { src: "/images/gallery/architecture-model.png", title: "โมเดลสถาปัตย์", material: "PLA · ขาวด้าน", time: "14 ชม. 30 นาที" },
  { src: "/images/gallery/lattice-lamp.png", title: "โคมไฟลายโวโรนอย", material: "PETG · โปร่งแสง", time: "11 ชม. 50 นาที" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : prints[active];

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:py-32">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs tracking-widest text-filament-soft">{"// ผลงานล่าสุด · RECENT WORK"}</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-5xl">
            งานสดๆ จากเครื่องพิมพ์สัปดาห์นี้
          </h2>
        </div>
        <p className="max-w-sm text-muted">ทุกชิ้นเริ่มจากไฟล์ที่ลูกค้าส่งมาทางไลน์ แล้วเราพิมพ์ออกมาให้จับต้องได้</p>
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {prints.map((p, i) => (
          <motion.li
            key={p.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={i % 3 === 1 ? "md:translate-y-10" : ""}
          >
            <motion.button
              type="button"
              layoutId={`print-${i}`}
              onClick={() => setActive(i)}
              whileHover="hover"
              className="group relative block aspect-[2/3] w-full overflow-hidden rounded-3xl border border-line bg-ink-2 text-left"
            >
              <motion.div
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={p.src}
                  alt={`${p.title} พิมพ์ด้วย ${p.material}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-16 text-white md:p-6">
                <p className="font-display text-lg font-semibold">{p.title}</p>
                <p className="mt-1 font-mono text-[11px] text-white/70">
                  {p.material} · {p.time}
                </p>
              </div>
            </motion.button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {current && active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <motion.figure
              layoutId={`print-${active}`}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[2/3] h-[min(85svh,900px)] max-w-full overflow-hidden rounded-3xl border border-line bg-ink-2"
            >
              <Image src={current.src} alt={current.title} fill sizes="90vw" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-20 text-white">
                <p className="font-display text-2xl font-semibold">{current.title}</p>
                <p className="mt-1 font-mono text-xs text-white/70">
                  {current.material} · {current.time}
                </p>
              </figcaption>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="ปิด"
                className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-line bg-black/50 text-white"
              >
                ✕
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
