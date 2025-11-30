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


}
