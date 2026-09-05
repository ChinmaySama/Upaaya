import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Upaaya — Growth Strategy & Cinematic Creative Studio",
  description:
    "Upaaya fuses high-impact performance marketing, SEO, and paid acquisition with world-class 3D CGI animation and brand strategy to scale category-defining businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${anton.variable}`}>
      <body className="bg-white font-sans text-[#111111] antialiased selection:bg-[#ffd100] selection:text-black">
        {children}
      </body>
    </html>
  );
}
