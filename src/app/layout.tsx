import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tradeboard.example.com"),
  title: {
    default: "TradeBoard | Market intelligence",
    template: "%s | TradeBoard",
  },
  description:
    "TradeBoard delivers a polished market intelligence experience with live insights, trending assets, and easy-to-scan dashboards.",
  keywords: [
    "crypto dashboard",
    "market intelligence",
    "trading insights",
    "asset overview",
    "financial analytics",
  ],
  authors: [{ name: "TradeBoard" }],
  creator: "TradeBoard",
  publisher: "TradeBoard",
  category: "Finance",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TradeBoard | Market intelligence",
    description:
      "TradeBoard delivers a polished market intelligence experience with live insights, trending assets, and easy-to-scan dashboards.",
    url: "/",
    siteName: "TradeBoard",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/crypto.jpg",
        width: 1200,
        height: 630,
        alt: "TradeBoard market intelligence dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeBoard | Market intelligence",
    description:
      "TradeBoard delivers a polished market intelligence experience with live insights, trending assets, and easy-to-scan dashboards.",
    images: ["/crypto.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/globe.svg",
    shortcut: "/globe.svg",
    apple: "/globe.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <QueryProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </QueryProvider>
    </html>
  );
}
