"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Step1Props = {
  onNext: (data: {
    groupNumber: string;
    supervisor: string;
    studentIds: string[];
    groupSize: number;
  }) => void;
};

export default function Step1_GroupInfo({ onNext }: Step1Props) {
  const router = useRouter();

  const [groupNumber, setGroupNumber] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [groupSize, setGroupSize] = useState(3); // default
  const [studentIds, setStudentIds] = useState<string[]>(Array(3).fill(""));

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setGroupSize(size);
    setStudentIds(Array(size).fill("")); // reset and match new size
  };

  const handleStudentIdChange = (index: number, value: string) => {
    const newIds = [...studentIds];
    newIds[index] = value;
    setStudentIds(newIds);
  };

  const handleNext = () => {
    if (!groupNumber || !supervisor || studentIds.some(id => !id)) {
      alert("Please fill in all fields");
      return;
    }
    onNext({ groupNumber, supervisor, studentIds, groupSize });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">👥 Group Information</h2>

      <div className="space-y-2">
        <Label>Group Number</Label>
        <Input value={groupNumber} onChange={(e) => setGroupNumber(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Supervisor</Label>
        <Input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Number of Students</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={groupSize}
          onChange={handleGroupSizeChange}
        >
          {[3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {studentIds.map((id, index) => (
          <div key={index} className="space-y-1">
            <Label>Student ID {index + 1}</Label>
            <Input
              value={id}
              onChange={(e) => handleStudentIdChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleNext} className="mt-4">
        Next ➡️
      </Button>
    </div>
  );
}
