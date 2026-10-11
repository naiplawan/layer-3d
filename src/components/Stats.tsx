"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  { value: 48210, suffix: "", label: "ชิ้นงานที่พิมพ์แล้ว" },
  { value: 1260, suffix: "", label: "ลูกค้าที่ไว้ใจเรา" },
  { value: 99.2, suffix: "%", label: "พิมพ์สำเร็จตั้งแต่ครั้งแรก", decimals: 1 },
  { value: 36, suffix: " ชม.", label: "ระยะเวลาผลิตเฉลี่ย" },
];

export default function Stats() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
          const target = Number(el.dataset.value);
          const decimals = Number(el.dataset.decimals ?? 0);
          const counter = { v: 0 };
          el.textContent = "0";
          gsap.to(counter, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = counter.v.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            },
          });
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="border-y border-line">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`border-line px-4 py-10 md:px-8 md:py-14 ${i % 2 === 0 ? "border-r" : ""} ${
              i < 2 ? "border-b md:border-b-0" : ""
            } ${i === 1 ? "md:border-r" : ""}`}
          >
            <dd className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="stat-value" data-value={s.value} data-decimals={s.decimals}>
                {s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals ?? 0 })}
              </span>
              <span className="text-filament">{s.suffix}</span>
            </dd>
            <dt className="mt-2 text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
