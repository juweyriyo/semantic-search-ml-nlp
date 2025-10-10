"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function WebLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-background text-foreground shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Semantic Search</h1>
        <nav className="space-x-4 text-sm font-medium">
          <Link href="/web/home" className="hover:text-blue-600">Home</Link>
          <Link href="/web/features" className="hover:text-blue-600">Features</Link>
          <Link href="/web/about" className="hover:text-blue-600">About</Link>
          <Link href="/web/team" className="hover:text-blue-600">Our Team</Link>
          <Link href="/web/login" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            Login
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="min-h-screen px-4 md:px-12 lg:px-32 bg-background text-foreground">
        {children}
      </main>

      <footer className="bg-background text-center py-4 text-foreground text-sm border-t">
        &copy; {new Date().getFullYear()} Semantic Search Project. All rights reserved.
      </footer>
    </>
  );
}
