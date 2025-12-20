"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ReviewProps {
  data: {
    groupNumber: string;
    supervisor: string;
    studentIds: string[];
    title: string;
    area: string;
    graduationYear: number;
  };
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step3_ReviewSubmit({ data, onBack, onSubmit }: ReviewProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit();
    alert("✅ Your project has been submitted successfully!");
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📋 Review & Submit</h2>

      <div className="text-gray-700">
        <p><strong>Group Number:</strong> {data.groupNumber}</p>
        <p><strong>Supervisor:</strong> {data.supervisor}</p>
        <p><strong>Student IDs:</strong></p>
        <ul className="list-disc list-inside">
          {data.studentIds.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
        <p><strong>Project Title:</strong> {data.title}</p>
        <p><strong>Area / Category:</strong> {data.area}</p>
        <p><strong>Graduation Year:</strong> {data.graduationYear}</p>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack} disabled={submitting}>
          ⬅️ Back
        </Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "✅ Submit"}
        </Button>
      </div>
    </div>
  );
}
