import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/sidebar";
import { Toaster } from "./_components/ui/sonner"

import { Inter } from "next/font/google";

const inter = Inter({
  display: "auto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stockly",
  description: "Admin for sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full">
          <Sidebar />
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
