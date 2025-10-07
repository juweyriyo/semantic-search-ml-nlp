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

      {/* Core Features */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Core Values of Our Platform</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-muted rounded-lg shadow hover:shadow-md transition">
            <Sparkles className="h-8 w-8 text-blue-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p>We leverage modern AI to go beyond keyword matching and capture real meaning.</p>
          </div>

          <div className="p-6 bg-muted rounded-lg shadow hover:shadow-md transition">
            <Brain className="h-8 w-8 text-purple-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold">Intelligence</h3>
            <p>Semantic similarity ensures that even paraphrased or reworded titles are detected.</p>
          </div>

          <div className="p-6 bg-muted rounded-lg shadow hover:shadow-md transition">
            <SearchCheck className="h-8 w-8 text-green-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold">Speed</h3>
            <p>Within seconds, students get feedback instead of waiting for manual responses.</p>
          </div>
        </div>
      </section>
  );
}
