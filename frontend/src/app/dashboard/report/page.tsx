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


}
