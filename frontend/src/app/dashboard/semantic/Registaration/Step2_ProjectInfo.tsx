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


}
