"use client";

import Image from "next/image";
import { Sparkles, Brain, SearchCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16 px-6 md:px-20 lg:px-40 bg-background text-foreground transition-colors">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Our Semantic Search System
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          We designed this platform to help university students quickly check whether their graduation project titles have been submitted before — even if written differently — using cutting-edge AI and NLP.
        </p>
      </section>

  );
}
