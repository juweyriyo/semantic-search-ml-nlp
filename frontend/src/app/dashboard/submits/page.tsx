"use client";

import { useEffect, useState } from "react";
import { fetchAllSubmissions, acceptSubmission } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BsListCheck } from "react-icons/bs";
import { FaUserGraduate, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

export default function StudentSubmissionsPage() {
  const [groups, setGroups] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    fetchAllSubmissions().then((data) => {
      setGroups(data || {});
      setLoading(false);
    });
  }, []);

  const handleAccept = async (group_id: string) => {
    try {
      console.log("ID🙄🙄🙄🙄", group_id);
      await acceptSubmission(group_id);
      const updated = await fetchAllSubmissions();
      setGroups(updated);
    } catch (err: any) {
      console.error("❌ Accept failed:", err.message);
    }
  };


  if (loading) return <p className="p-4">⏳ Loading submissions...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <BsListCheck className="text-blue-600" /> Student Submissions
      </h1>

      {/* Group Selection List */}
      {selectedGroup === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(groups).map(([group, submissions]: any) => (
            <Card
              key={group}
              className="cursor-pointer p-6 border hover:border-blue-600 shadow"
              onClick={() => setSelectedGroup(group)}
            >
              <h2 className="text-xl font-bold text-blue-700">Group {group}</h2>
              <p className="text-gray-500">Submissions: {submissions.length}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button className="mb-4" onClick={() => setSelectedGroup(null)}>
            ← Back to Group List
          </Button>

          <Card className="p-6 shadow-md border border-gray-200 bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              📦 Group <span className="text-blue-700">{selectedGroup}</span>
            </h2>

            {/* Group Info */}
            {groups[selectedGroup]?.[0] && (
              <div className="text-gray-700 space-y-1 mb-4">
                <p className="flex items-center gap-2">
                  <FaChalkboardTeacher /> Supervisor: <strong>{groups[selectedGroup][0].supervisor}</strong>
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers /> Student IDs: {groups[selectedGroup][0].student_ids.join(", ")}
                </p>
                <p className="flex items-center gap-2">
                  <FaUserGraduate /> Graduation Year: {groups[selectedGroup][0].year}
                </p>
              </div>
            )}

            <Separator className="my-4" />

            {/* Only accepted title */}
            {groups[selectedGroup].some((s: any) => s.status === "accepted") ? (
              groups[selectedGroup]
                .filter((s: any) => s.status === "accepted")
                .map((sub: any, i: number) => (
                  <div
                    key={i}
                    className="border-l-4 border-green-500 p-4 mb-4 bg-green-50 rounded-md shadow-sm"
                  >
                    <p className="text-lg font-semibold">📘 {sub.title}</p>
                    <p className="ml-4">📁 Area: {sub.area}</p>
                    <p className="ml-4 mt-2">
                      <Badge variant="outline">{sub.status}</Badge>
                    </p>
                  </div>
                ))
            ) : (
              groups[selectedGroup].map((sub: any, i: number) => (
                console.log("Group item:", sub), // ✅ Make sure sub._id exists
                <div
                  key={i}
                  className="border-l-4 border-yellow-500 p-4 mb-4 bg-yellow-50 rounded-md shadow-sm"
                >
                  <p className="text-lg font-semibold">📘 {sub.title}</p>
                  <p className="ml-4">📁 Area: {sub.area}</p>
                  <p className="ml-4 mt-2">
                    <Badge variant="outline">{sub.status}</Badge>
                  </p>
                  <Button onClick={() => handleAccept(selectedGroup)}>✅ Accept This Title</Button>
                </div>
              ))
            )}
          </Card>
        </div>
      )}
    </div>
  );
}