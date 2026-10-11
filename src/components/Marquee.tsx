const items = ["PLA", "PETG", "ABS", "ASA", "TPU 95A", "Nylon CF", "Tough Resin", "Clear Resin", "Polycarbonate"];

export default function Marquee() {
  return (
    <div className="border-y border-line bg-ink-2 py-5" aria-label="วัสดุที่รองรับ">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="animate-marquee flex shrink-0 gap-12 pr-12 font-display text-2xl font-medium text-muted">
          {[...items, ...items].map((item, i) => (
            <li key={i} className="flex items-center gap-12 whitespace-nowrap" aria-hidden={i >= items.length}>
              {item}
              <span className="size-2 rotate-45 bg-filament" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
