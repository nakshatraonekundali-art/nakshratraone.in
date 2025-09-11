import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Kundli Online | NakshatraOne Astrology & Horoscope",
  description:
    "Generate your free Kundli online with NakshatraOne. Get accurate Vedic astrology predictions, horoscope analysis & remedies by expert astrologers instantly.",
  icons: {
    icon: "https://www.nakshatraone.com/cdn/shop/files/nakshatraone_logo_White.png?v=1746015984&width=360",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
