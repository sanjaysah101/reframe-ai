import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
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
  title: "ReframeAI - Everything You Need to Modernize",
  description:
    "From clunky and outdated to fast and beautiful – give your website the upgrade it deserves in just a few clicks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#111111] pt-[100px] text-gray-300">
          <Navbar />
          <main className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 pt-8 pb-16 text-center">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
