"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Step2Props = {
  data: {
    studentIds: string[];
    title: string;
  };
  onNext: (data: { title: string; area: string; graduationYear: number }) => void;
  onBack: () => void;
};

export default function Step2_ProjectInfo({ data, onNext, onBack }: Step2Props) {
  const [area, setArea] = useState("");
  const [title, setTitle] = useState(data.title || "");
  const [graduationYear, setGraduationYear] = useState<number | null>(null);

  useEffect(() => {
    const firstId = data.studentIds[0];
    const match = firstId.match(/C1(\d{2})/);
    if (match) {
      const regYear = 2000 + parseInt(match[1]);
      setGraduationYear(regYear + 4);
    }
  }, [data.studentIds]);

  const handleNext = () => {
    if (!area || !graduationYear) {
      alert("Please enter the category.");
      return;
    }
    onNext({ title, area, graduationYear });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📑 Project Information</h2>

      <div className="space-y-2">
        <Label>Project Title</Label>
        <Input value={title} disabled />
      </div>

      <div className="space-y-2">
        <Label>Area / Category</Label>
        <Input value={area} onChange={(e) => setArea(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Graduation Year</Label>
        <Input value={graduationYear?.toString()} disabled />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack}>
          ⬅️ Back
        </Button>
        <Button onClick={handleNext}>
          Next ➡️
        </Button>
      </div>
    </div>
  );
}
