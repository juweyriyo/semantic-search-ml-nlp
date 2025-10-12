"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import { getTop3Categories } from "@/lib/api";
import "chart.js/auto";

export default function DashboardPage() {
  const [data, setData] = useState<{ category: string; count: number }[]>([]);

  useEffect(() => {
    getTop3Categories().then(setData);
  }, []);

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Project Count",
        data: data.map((d) => d.count),
        backgroundColor: "#0f172a",
      },
    ],
  };

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-800">🎓 Welcome To Researcher</h1>
      <section className="bg-gray-200 p-4 rounded-md shadow">
        <h2 className="text-xl mb-4 text-gray-700"> Top 3 Most Frequent Categories (All Time)</h2>
        <Bar data={chartData} />
      </section>

    </main>
  );
}
