// src/app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes"; // ✅ import
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semantic Search System",
  description: "Graduation Project built with Next.js and NLP",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
