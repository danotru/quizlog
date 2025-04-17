import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import TitleBar from "@/app/_components/TitleBar";
import NavBar from "@/app/_components/NavBar";

/**
 * Root metadata
 */
export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Quizlog",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Outfit font
 */
const outfit = localFont({
  src: [
    { path: "../public/fonts/outfit-medium.woff2", weight: "500" },
    { path: "../public/fonts/outfit-semibold.woff2", weight: "600" },
    { path: "../public/fonts/outfit-bold.woff2", weight: "700" },
  ],
  variable: "--font-outfit",
});

/**
 * Root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <TitleBar />
        {children}
        <NavBar />
      </body>
    </html>
  );
}
