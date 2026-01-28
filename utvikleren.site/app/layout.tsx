import type { Metadata } from "next";
import "./globals.css";
import BubbleMenu from "./components/BubbleMenu";
import { Suspense } from "react";
import AuthCallbackListener from "./components/AuthCallbackListener";
import { Toaster } from "./components/ui/sonner";

export const metadata: Metadata = {
  title: "Utvikleren.site",
  description: "Professional development services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = [
    {
      label: 'hjem',
      href: '/',
      ariaLabel: 'Hjem',
      rotation: -8,
      hoverStyles: { bgColor: '#5227FF', textColor: '#ffffff' }
    },
    {
      label: 'referanser',
      href: '/referanser',
      ariaLabel: 'Referanser',
      rotation: 8,
      hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    },
    {
      label: 'om oss',
      href: '/om-oss',
      ariaLabel: 'Om oss',
      rotation: 8,
      hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
      label: 'tjenester',
      href: '/tjenester',
      ariaLabel: 'Tjenester',
      rotation: -8,
      hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
      label: 'ta kontakt',
      href: '/kontakt',
      ariaLabel: 'Ta kontakt',
      rotation: 12,
      hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    }
  ];

  // ... existing code ...

  return (
    <html lang="no" className="bg-[#030303]">
      <body className="bg-[#030303]">
        <BubbleMenu
          logo="/Logo.png"
          items={menuItems}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#000000"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
        <Suspense fallback={null}>
          <AuthCallbackListener />
        </Suspense>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
