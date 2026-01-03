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
  title: "Utvikleren.site",
  description: "Send henvendelse, få en demo, uten kostnader. Vi bygger fremtidens digitale løsninger.",
  verification: {
    google: "s4i35jYi6uqJAnNDfL9c8_4bgfCqTFS0laq1NZEKsnU",
  },
};

import { Suspense } from "react";
import AnalyticsTracker from "./components/AnalyticsTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
