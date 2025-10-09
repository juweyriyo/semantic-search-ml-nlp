// src/app/web/home/page.tsx

"use client";

import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle"; 

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center py-10 px-4 text-center min-h-screen bg-background text-foreground transition-colors">
      {/* Toggle Button: Midig kore ama center */}
      {/* <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div> */}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        AI-Powered Semantic Search for <br /> University Students
      </h1>

    </main>
  );
}