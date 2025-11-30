"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

interface ReportRow {
  id: string;
  title: string;
  category: string;
  year: number;
}

export default function ReportPage() {
  const [data, setData] = useState<ReportRow[]>([]);
  const [filteredData, setFilteredData] = useState<ReportRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/report")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: ReportRow, b: ReportRow) => {
          const numA = parseInt(a.id.replace(/\D/g, ""));
          const numB = parseInt(b.id.replace(/\D/g, ""));
          return numA - numB;
        });
        setData(sorted);
        setFilteredData(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch report data:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lower = term.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.id.toLowerCase().includes(lower) ||
        item.title.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        item.year.toString().includes(lower)
    );
    const sortedFiltered = filtered.sort((a, b) => {
      const numA = parseInt(a.id.replace(/\D/g, ""));
      const numB = parseInt(b.id.replace(/\D/g, ""));
      return numA - numB;
    });
    setFilteredData(sortedFiltered);
  };

  const downloadCSV = () => {
    const csv = [
      ["ID", "Project Title", "Category", "Graduation Year"],
      ...filteredData.map((row) => [row.id, row.title, row.category, row.year]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "semantic_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <p className="p-4">⏳ Loading report...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📘 Semantic Report</h1>
        <Button onClick={downloadCSV}>
          <Download className="w-4 h-4 mr-2" /> Download CSV
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex items-center border px-3 py-2 rounded-md max-w-md">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search project title, category, or year..."
            className="w-full outline-none bg-transparent"
          />
        </div>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Project Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Graduation Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.title}</td>
              <td className="p-2">{row.category}</td>
              <td className="p-2">{row.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
