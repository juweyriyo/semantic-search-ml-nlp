"use client";

import { BrainCircuit, SearchCheck, LineChart, Users2, LayoutTemplate, MessageSquareHeart,  BadgeCheck } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen py-16 px-6 text-center bg-background text-foreground transition-colors">
      {/* Top Heading */}
      <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wide mb-2">
        Features Overview
      </h2>
      <h1 className="text-4xl font-bold mb-8">
        Discover the Key Features of Our Semantic Search Platform
      </h1>

      {/* Grid of Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Feature Card 1 */}
        <div className="p-6 bg-muted rounded-xl shadow-md">
          <SearchCheck className="h-8 w-8 text-blue-600 mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Semantic Matching</h3>
          <p>
            Instantly matches project titles based on meaning, not just keywords. Uses SBERT-powered AI to detect paraphrasing.
          </p>
        </div>

      </div>
    </main>
  );
}
