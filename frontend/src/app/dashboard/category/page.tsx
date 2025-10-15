"use client";

import { useEffect, useState } from "react";
import { getTopCategories, getAllCategoryData } from "@/lib/api";
import { Bar, Pie, Line } from "react-chartjs-2";
import Select from "react-select";
import "chart.js/auto";

export default function CategoryAnalyticsPage() {
  const [top3, setTop3] = useState([]);
  const [data, setData] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    getTopCategories().then(setTop3);
    getAllCategoryData().then(setData);
  }, []);

  const allCategories = [...new Set(data.map(d => d.category))];
  const allYears = [...new Set(data.map(d => d.year))].sort((a, b) => a - b);

  const categoryOptions = allCategories.map(cat => ({ value: cat, label: cat }));
  const yearOptions = allYears.map(year => ({ value: year, label: year.toString() }));

  const handleFilter = () => setShowResult(true);
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedYears([]);
    setShowResult(false);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800"> Category Analytics</h1>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-4">
        {top3.map((item: any, i) => (
          <div key={i} className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold">Top {i + 1}</h3>
            <p className="text-3xl font-bold text-indigo-600">{item.count}</p>
            <p className="text-gray-600">{item.category}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Category</label>
          <Select
            isMulti
            options={categoryOptions}
            value={categoryOptions.filter(opt => selectedCategories.includes(opt.value))}
            onChange={(selected) => setSelectedCategories(selected.map(opt => opt.value))}
            placeholder="Select Category..."
            className="text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select Year</label>
          <Select
            isMulti
            options={yearOptions}
            value={yearOptions.filter(opt => selectedYears.includes(opt.value))}
            onChange={(selected) => setSelectedYears(selected.map(opt => opt.value))}
            placeholder="Select Year..."
            className="text-black"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Show Result
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          🔄 Reset
        </button>
      </div>

      {/* Charts */}
      {!showResult && (
        <div>
          <h2 className="text-lg font-semibold mt-6">🥧 Overall Category Distribution</h2>
          <Pie
            data={{
              labels: allCategories,
              datasets: [
                {
                  data: allCategories.map(
                    cat => data.filter(d => d.category === cat).length
                  ),
                  backgroundColor: allCategories.map(
                    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
                  ),
                },
              ],
            }}
          />
        </div>
      )}

    </div>
  );
}
