import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "COACH | Luxury Designer Handbags",
  description: "Shop the finest designer Coach handbags. Discover shoulder bags, totes, crossbody bags, and more. Free shipping on orders over $150.",
  keywords: "Coach handbags, designer bags, women's purses, luxury handbags, shoulder bags, totes, crossbody bags",
  openGraph: {
    title: "COACH | Luxury Designer Handbags",
    description: "Shop the finest designer Coach handbags",
    type: "website",
    locale: "en_US",
    siteName: "COACH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
