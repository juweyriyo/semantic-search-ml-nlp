// ✅ Updated Step1_GroupInfo.tsx with professional validation UI
"use client";
import { useState, useEffect } from "react";
import { getStudentSubmission } from "@/lib/api"; // adjust path if needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkGraduate, checkStudentGroup } from "@/lib/api";
import clsx from "clsx";

interface Step1Props {
  onNext: (data: {
    groupNumber: string;
    supervisor: string;
    studentIds: string[];
    groupSize: number;
  }) => void;
  setStep: (step: number) => void;
  setFormData: (data: any) => void;
  formData: any;
  setError: (msg: string) => void;
  userId: string;
}


export default function Step1_GroupInfo({ onNext, setStep, setFormData, setError, formData, userId }: Step1Props) {
  const [groupNumber, setGroupNumber] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [groupSize, setGroupSize] = useState(3);
  const [studentIds, setStudentIds] = useState<string[]>(Array(3).fill(""));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [studentErrors, setStudentErrors] = useState<string[]>([]);

}
