import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LuxeCoach | Designer Women's Handbags",
  description: "Shop the finest designer Coach handbags. Discover shoulder bags, totes, crossbody bags, and more. Free shipping on orders over $150.",
  keywords: "Coach handbags, designer bags, women's purses, luxury handbags, shoulder bags, totes, crossbody bags",
  openGraph: {
    title: "LuxeCoach | Designer Women's Handbags",
    description: "Shop the finest designer Coach handbags",
    type: "website",
    locale: "en_US",
    siteName: "LuxeCoach",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeCoach | Designer Women's Handbags",
    description: "Shop the finest designer Coach handbags",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
