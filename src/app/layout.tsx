import type { Metadata } from "next";
import { Nunito, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NusaWorld — Belajar Bahasa Arab itu Menyenangkan",
  description:
    "Platform belajar bahasa Arab berbasis gamifikasi. Selesaikan quest, kumpulkan koin, dan bangun kotamu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} ${notoNaskh.variable}`}>
      <body>{children}</body>
    </html>
  );
}
