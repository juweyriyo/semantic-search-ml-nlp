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

}
