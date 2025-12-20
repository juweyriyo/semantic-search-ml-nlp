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
  useEffect(() => {
    const checkExistingSubmission = async () => {
      try {
        const res = await getStudentSubmission(userId); // Use logged-in ID
        if (res?.group_number && res?.status !== "accepted") {
          // ✅ Already registered but not accepted → Skip to Step 2
          setStep(2);
          setFormData({
            ...formData,
            student_ids: res.student_ids,
            group_number: res.group_number,
            supervisor: res.supervisor,
          });
        } else if (res?.status === "accepted") {
          // ✅ Already accepted → block registration
          setError("Your title has already been accepted. You cannot register again.");
          setStep(0);
        }
      } catch (err) {
        console.log("❌ Not yet registered");
      }
    };

    checkExistingSubmission();
  }, []);

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setGroupSize(size);
    setStudentIds(Array(size).fill(""));
    setStudentErrors(Array(size).fill(""));
  };

}
