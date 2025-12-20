"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { semanticSearch, registerProject, checkRegistrationStatus } from "@/lib/api";
import Step1 from "./Registaration/Step1_GroupInfo";
import Step2 from "./Registaration/Step2_ProjectInfo";
import Step3 from "./Registaration/Step3_Review";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { parseJwt } from "@/lib/jwt";

export default function SemanticSearchPage() {
  const [title, setTitle] = useState("");
  const [threshold, setThreshold] = useState(0.55);
  const [results, setResults] = useState<any[]>([]);
  const [matchFound, setMatchFound] = useState(false);
  const [maxScore, setMaxScore] = useState(0.55);
  const [searched, setSearched] = useState(false);
  const [titleAccepted, setTitleAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const [groupData, setGroupData] = useState<any>({});
  const [projectData, setProjectData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = Cookies.get("token");
  const { user_id: userId } = token ? parseJwt(token) : { user_id: null };

  const handleSearch = async () => {
    if (!title.trim()) {
      toast.warning("Please enter a project title.");
      return;
    }

    try {
      const res = await semanticSearch(title, threshold);
      setResults(res.matches || []);
      setMaxScore(res.max_score || 0.55);
      setMatchFound(res.match_found);
      setSearched(true);
    } catch (err) {
      toast.error("Search failed. Try again.");
    }
  };

}
