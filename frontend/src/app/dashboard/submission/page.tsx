"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getStudentSubmissions } from "@/lib/api";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { MdOutlineTopic } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

// Define interface for each submission
interface Submission {
  title: string;
  area: string;
  status?: "accepted" | "pending" | "rejected";
}

// Define expected structure from decoded JWT
interface TokenPayload {
  user_id: string;
}

export default function YourSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("⛔ No token found");
          return;
        }

        const decoded = jwtDecode<TokenPayload>(token);
        const userId = decoded.user_id;

        const data = await getStudentSubmissions(token); // Send token to backend
        setSubmissions(data);
      } catch (error) {
        console.error("❌ Failed to fetch submissions:", error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);


}
