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
  title: "Fennecom Dev Portfolio — Full-Stack Engineer",
  description:
    "Portfolio of a full-stack engineer specializing in modern SaaS, e-commerce platforms (Fennecom), educational tools (Curazon), corporate websites (ROLMAX TEX), and desktop engineering (Harb Al-Shamela).",
  keywords: ["portfolio", "full-stack", "Next.js", "React", "Fennecom", "Curazon", "ROLMAX", "software engineer"],
  openGraph: {
    title: "Fennecom Dev Portfolio",
    description: "Premium software engineering portfolio — SaaS, E-commerce, EdTech & Games.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-[#1b5e37] selection:text-white">
        {children}
      </body>
    </html>
  );
}
