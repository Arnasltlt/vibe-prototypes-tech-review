import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/colors.css";
import "../styles/typography.css";
import "../styles/variables.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// As a fallback, we'll use Geist for the system font, but we'd ideally use Lineto Circular
// which is the design system's primary font.
export const metadata: Metadata = {
  title: "Protolabs Factory Network Component Showcase",
  description: "Component showcase for the Factory Network React implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        style={{ fontFamily: "var(--font-family, var(--font-geist-sans))" }}
        data-new-gr-c-s-check-loaded="14.1226.0"
        data-gr-ext-installed=""
      >
        {children}
      </body>
    </html>
  );
}
