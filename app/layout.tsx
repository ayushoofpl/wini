import type { Metadata } from "next";
import { Assistant, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppBot } from "@/components/layout/WhatsAppBot";

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
  display: "swap",
  weight: ["200", "300", "400", "600", "700"],
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Individual office furniture from the manufacturer - WINI. My office.",
  description: "High-quality office furniture and holistic furnishing concepts for modern working environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${assistant.variable} ${crimsonPro.variable}`}>
      <body className={`antialiased bg-white selection:bg-primary selection:text-white pt-20`}>
        <Header />
        {children}
        <Footer />
        <WhatsAppBot />
      </body>
    </html>
  );
}
