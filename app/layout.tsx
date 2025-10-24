import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel"
});

export const metadata: Metadata = {
  title: "FinBuddy - Mine Your Financial Future",
  description: "Minecraft-themed financial literacy gamification platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${pixelFont.variable} antialiased bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
