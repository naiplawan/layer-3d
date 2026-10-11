import type { Metadata } from "next";
import { Anuphan, Geist_Mono, IBM_Plex_Sans_Thai, Space_Grotesk } from "next/font/google";
import LineButton from "@/components/LineButton";
import "./globals.css";

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Layer เลเยอร์ — รับปริ้นท์งาน 3 มิติ กรุงเทพฯ",
  description:
    "รับปริ้นท์ 3 มิติ งานต้นแบบ ชิ้นงานจริง และงานล็อตผลิต ส่งไฟล์ทางไลน์ รู้ราคาภายใน 10 นาที ได้ของใน 2–3 วัน",
  openGraph: {
    title: "Layer เลเยอร์ — รับปริ้นท์งาน 3 มิติ",
    description: "จากไฟล์ในคอม สู่ชิ้นงานจริงในมือคุณ",
    type: "website",
    locale: "th_TH",
    images: [{ url: "/images/og/og.jpg", width: 1200, height: 630, alt: "เครื่องพิมพ์ 3 มิติของ Layer กำลังพิมพ์งาน" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og/og.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${plexThai.variable} ${anuphan.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <LineButton />
      </body>
    </html>
  );
}
