import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manki.ai Jewels | AI Jewellery Design Studio",
  description: "Design your own jewellery with AI-powered inspiration by Manki.ai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#050816] text-slate-100`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 pt-6">
            <div className="w-full">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
