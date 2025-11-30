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
