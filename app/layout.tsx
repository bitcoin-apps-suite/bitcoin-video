import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DevSidebarProvider } from '@/components/DevSidebarProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin Video - Premium Bitcoin Content Platform",
  description: "The ultimate destination for Bitcoin videos, tutorials, news, and analysis. Stay updated with the latest in cryptocurrency and blockchain technology.",
  icons: {
    icon: [
      {
        url: "/bitcoin-video.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "/bitcoin-video.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "/bitcoin-video.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },
  openGraph: {
    title: "Bitcoin Video - Premium Bitcoin Content Platform",
    description: "The ultimate destination for Bitcoin videos, tutorials, news, and analysis. Stay updated with the latest in cryptocurrency and blockchain technology.",
    url: "https://bitcoin-video.app",
    siteName: "Bitcoin Video",
    images: [
      {
        url: "/bitcoin-video.jpg",
        width: 1200,
        height: 630,
        alt: "Bitcoin Video Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Video - Premium Bitcoin Content Platform",
    description: "The ultimate destination for Bitcoin videos, tutorials, news, and analysis. Stay updated with the latest in cryptocurrency and blockchain technology.",
    images: ["/bitcoin-video.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DevSidebarProvider>
          {children}
        </DevSidebarProvider>
      </body>
    </html>
  );
}
