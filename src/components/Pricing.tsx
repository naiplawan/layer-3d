"use client";

import { motion } from "motion/react";

const tiers = [
  {
    name: "งานต้นแบบ",
    en: "PROTOTYPE",
    price: "฿350",
    unit: "/ ชิ้น เริ่มต้น",
    blurb: "ชิ้นเดียวก็รับ ลองทรงลองขนาดได้รวดเร็ว",
    features: ["PLA หรือ PETG", "เลเยอร์ 0.2 mm", "ได้ของใน 48 ชม.", "ระบบเช็คไฟล์อัตโนมัติ"],
    cta: "เริ่มสั่งงาน",
    featured: false,
  },
  {
    name: "งานล็อตผลิต",
    en: "PRODUCTION",
    price: "฿120",
    unit: "/ ชิ้น เมื่อสั่ง 100+",
    blurb: "ผลิตเป็นล็อต ขนาดแม่นยำ เชื่อถือได้ทุกชิ้น",
    features: ["วัสดุ FDM และเรซิ่นทั้งหมด", "รายงาน QC ทุกล็อต", "มีวิศวกรดูแลเฉพาะ", "คิวด่วนพิเศษ"],
    cta: "เริ่มสั่งงาน",
    featured: true,
  },
  {
    name: "สตูดิโอรายเดือน",
    en: "STUDIO",
    price: "ตามตกลง",
    unit: "/ แพ็กเกจรายเดือน",
    blurb: "สำหรับเอเจนซี่และทีมฮาร์ดแวร์ที่พิมพ์งานทุกสัปดาห์",
    features: ["จองชั่วโมงเครื่องล่วงหน้า", "ขัดผิวและทำสี", "ช่วยออกแบบ CAD", "วางบิลเครดิต 30 วัน"],
    cta: "คุยกับเรา",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-blueprint scroll-mt-24 border-y border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-mono text-xs tracking-widest text-filament-soft">{"// ราคา · PRICING"}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.25] font-semibold tracking-tight md:text-5xl">
          ราคาชัดเจน ไม่มีค่าเปิดงาน
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col rounded-3xl border bg-ink-2 p-8 ${
                t.featured
                  ? "border-filament shadow-[0_24px_60px_-30px_var(--filament)]"
                  : "border-line shadow-sm"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-filament px-3 py-1 text-xs font-semibold text-white">
                  ยอดนิยม
                </span>
              )}
              <p className="font-mono text-[11px] tracking-widest text-muted">{t.en}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-muted">{t.blurb}</p>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-5xl leading-tight font-semibold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted">{t.unit}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="size-1.5 rotate-45 bg-filament" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#quote"
                whileTap={{ scale: 0.97 }}
                className={`mt-10 rounded-full px-5 py-3 text-center font-semibold ${
                  t.featured ? "bg-filament text-white" : "border border-line hover:bg-ink-3"
                }`}
              >
                {t.cta}
              </motion.a>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          ราคายังไม่รวม VAT 7% · ออกใบกำกับภาษีเต็มรูปแบบได้ · รับชำระผ่านพร้อมเพย์และโอนบัญชี
        </p>
      </div>
    </section>
  );
}
