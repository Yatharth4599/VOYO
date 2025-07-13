import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
// import Providers from "@/components/Providers";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

export const metadata: Metadata = {
  title: "Voyo - Your AI Agent Marketplace",
  description: "Build multi-step AI voice agents and integrate apps with VOYO. The fast way to get AI working in your business.",
  metadataBase: new URL('https://www.voyo.club'),
  openGraph: {
    title: "Voyo - Your AI Agent Marketplace",
    description: "Build multi-step AI voice agents and integrate apps with VOYO. The fast way to get AI working in your business.",
    url: "https://www.voyo.club",
    siteName: "Voyo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Voyo - Your AI Agent Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyo - Your AI Agent Marketplace",
    description: "Build multi-step AI voice agents and integrate apps with VOYO. The fast way to get AI working in your business.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo-voyo-removebg-preview.png",
    shortcut: "/logo-voyo-removebg-preview.png",
    apple: "/logo-voyo-removebg-preview.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8F9FJXMX7R"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8F9FJXMX7R');
          `}
        </Script>
      </head>
      <body>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
