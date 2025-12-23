import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
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
  title: "2wenty3 | Premium Designer Handbags",
  description: "Shop premium designer handbags at 2wenty3 LLC. Discover shoulder bags, totes, crossbody bags, and more. Free shipping on orders over $150.",
  keywords: "designer handbags, women's purses, luxury handbags, shoulder bags, totes, crossbody bags, 2wenty3",
  openGraph: {
    title: "2wenty3 | Premium Designer Handbags",
    description: "Shop premium designer handbags at 2wenty3 LLC",
    type: "website",
    locale: "en_US",
    siteName: "2wenty3",
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
