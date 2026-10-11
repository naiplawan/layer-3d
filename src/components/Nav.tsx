"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { LineIcon } from "./LineButton";

const links = [
  { href: "#services", label: "บริการ" },
  { href: "#process", label: "ขั้นตอน" },
  { href: "#materials", label: "วัสดุ" },
  { href: "#gallery", label: "ผลงาน" },
  { href: "#pricing", label: "ราคา" },
  { href: "#faq", label: "คำถาม" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "border-line bg-ink-2/85 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-filament text-white">
            <svg viewBox="0 0 20 20" className="size-4" fill="currentColor" aria-hidden>
              <rect x="3" y="13" width="14" height="3" rx="1" />
              <rect x="5" y="8.5" width="10" height="3" rx="1" />
              <rect x="7" y="4" width="6" height="3" rx="1" />
            </svg>
          </span>
          <span className="font-display text-xl leading-none font-semibold">Layer</span>
          <span className="text-sm text-muted">เลเยอร์</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-ink-3 hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href="#quote"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden items-center gap-1.5 rounded-full bg-line-green px-4 py-2 text-sm font-semibold text-white sm:flex"
          >
            <LineIcon className="size-4" />
            สอบถามราคา
          </motion.a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="เปิดเมนู"
            className="grid size-10 place-items-center rounded-full border border-line bg-ink-2 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-0.5 w-4 bg-paper"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 h-0.5 w-4 bg-paper"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-ink-2/95 p-2 shadow-lg backdrop-blur-xl lg:hidden"
          >
            {[...links, { href: "#quote", label: "สอบถามราคา" }].map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-paper hover:bg-ink-3"
                >
                  {l.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
