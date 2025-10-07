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

      {/* Image + Description */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16">
        <div className="lg:w-1/2">
          <Image
            src="/images/haa.png"
            alt="About Semantic Search"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">Why We Built This System</h2>
          <p>
            Traditionally, students had to wait days for a manual approval process to see if their title already existed. Our solution uses semantic search powered by SBERT to instantly find similar titles, saving time and effort.
          </p>
          <p>
            Whether you're working on AI, IoT, or Web Development — this tool ensures your idea is unique by checking against past projects using true **meaning-based comparison**.
          </p>
        </div>
      </section>
  );
}
