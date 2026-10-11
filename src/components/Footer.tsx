const columns = [
  {
    title: "ติดต่อเรา",
    items: ["LINE: @layer3d", "โทร 02-000-0000", "hello@layer.example"],
  },
  {
    title: "เวลาทำการ",
    items: ["เปิดทุกวัน 9:00–19:00 น.", "รับไฟล์ทางไลน์ 24 ชม."],
  },
  {
    title: "สตูดิโอ",
    items: ["ซอยอารีย์ พญาไท", "กรุงเทพมหานคร 10400"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold">Layer</span>
            <span className="text-muted">เลเยอร์</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            สตูดิโอรับปริ้นท์ 3 มิติ ในกรุงเทพฯ งานต้นแบบ งานผลิต และงานออกแบบ ครบในที่เดียว
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row">
          <p>© 2026 Layer Studio</p>
          <p>เว็บไซต์ตัวอย่าง (concept) · Layer เป็นแบรนด์สมมติ</p>
        </div>
      </div>
    </footer>
  );
}
