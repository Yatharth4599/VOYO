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
  title: 'VOYO – Your Voice AI Partner',
  description: 'Talk to VOYO – your AI genie that speaks, listens, and helps.',
  openGraph: {
    title: 'VOYO – AI that Talks Back',
    description: 'Try VOYO, the voice-first AI agent for your business or personal life.',
    url: 'https://voyo.club',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>VOYO – Your Voice AI Partner</title>
        <meta name="description" content="Talk to VOYO – your AI genie that listens, speaks, and solves." />
        <meta property="og:title" content="VOYO – AI that Talks Back" />
        <meta property="og:description" content="Try VOYO, the voice-first AI agent for work and emotion." />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content="https://voyo.club" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
      >
        {children}
       
      </body>
    </html>
  );
}
