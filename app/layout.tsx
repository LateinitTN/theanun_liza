/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { Playfair_Display, Inter, Moul, Siemreap, Suwannaphum, Chenla } from "next/font/google"; // Changed Kantumruy_Pro to Siemreap
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const moul = Moul({
  variable: "--font-moul",
  weight: ["400"],
  subsets: ["khmer"],
});

const siemreap = Siemreap({
  variable: "--font-siemreap",
  subsets: ["khmer"],
  weight: ["400"], // Siemreap only has regular weight usually, checking docs or defaulting to 400
});

const suwannaphum = Suwannaphum({
  variable: "--font-suwannaphum",
  weight: ["400", "700"],
  subsets: ["khmer"],
});

const chenla = Chenla({
  variable: "--font-chenla",
  weight: ["400"],
  subsets: ["khmer"],
});

export const metadata: Metadata = {
  title: "Theanun & Liza — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the union of Theanun & Liza. April 13, 2026.",
  keywords: ["wedding", "invitation", "Theanun", "Liza", "celebration"],
  openGraph: {
    title: "Theanun & Liza — Wedding Invitation",
    description: "Join us for our special day — April 13, 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} ${moul.variable} ${siemreap.variable} ${suwannaphum.variable} ${chenla.variable} antialiased bg-[#FCF8F4]`}
      >
        {children}
      </body>
    </html>
  );
}

