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

}
