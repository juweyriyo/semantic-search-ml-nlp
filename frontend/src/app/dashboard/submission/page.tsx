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

  if (loading)
    return <p className="p-6 text-blue-600">⏳ Loading your submissions...</p>;

  if (submissions.length === 0) {
    return (
      <p className="p-6 text-orange-600 text-lg">
        🚫 You haven't submitted any project titles yet.
      </p>
    );
  }

  const accepted = submissions.filter((s) => s.status === "accepted");
  const pending = submissions.filter((s) => !s.status || s.status === "pending");
  const rejected = submissions.filter((s) => s.status === "rejected");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📄 Your Submitted Titles</h1>

      {/* ✅ Accepted Titles */}
      {accepted.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" /> Accepted Titles
          </h2>
          <Separator className="my-2" />
          {accepted.map((item, idx) => (
            <Card key={idx} className="p-4 mb-4 border-green-500 bg-green-50 shadow-sm">
              <p>
                <MdOutlineTopic className="inline mr-1" />{" "}
                <strong>{item.title}</strong>
              </p>
              <p className="text-sm text-gray-700">📁 Area: {item.area}</p>
              <Badge className="mt-2 bg-green-600 text-white">Accepted</Badge>
            </Card>
          ))}
        </div>
      )}

      {/* ⏳ Pending Titles */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
            <FaClock className="text-yellow-600" /> Pending Titles
          </h2>
          <Separator className="my-2" />
          {pending.map((item, idx) => (
            <Card
              key={idx}
              className="p-4 mb-4 border-yellow-400 bg-yellow-50 shadow-sm"
            >
              <p>
                <MdOutlineTopic className="inline mr-1" />{" "}
                <strong>{item.title}</strong>
              </p>
              <p className="text-sm text-gray-700">📁 Area: {item.area}</p>
              <Badge className="mt-2 bg-yellow-600 text-white">Pending</Badge>
            </Card>
          ))}
        </div>
      )}

      {/* ❌ Rejected Titles */}
      {rejected.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-red-700 flex items-center gap-2">
            <FaTimesCircle className="text-red-600" /> Rejected Titles
          </h2>
          <Separator className="my-2" />
          {rejected.map((item, idx) => (
            <Card
              key={idx}
              className="p-4 mb-4 border-red-500 bg-red-50 shadow-sm"
            >
              <p>
                <MdOutlineTopic className="inline mr-1" />{" "}
                <strong>{item.title}</strong>
              </p>
              <p className="text-sm text-gray-700">📁 Area: {item.area}</p>
              <Badge className="mt-2 bg-red-600 text-white">Rejected</Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
