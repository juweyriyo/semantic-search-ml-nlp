// /dashboard/student/semantic/RegistrationFlow.tsx
"use client";
import { useState } from "react";
import Step1_GroupInfo from "./Step1_GroupInfo";
import Step2_ProjectInfo from "./Step2_ProjectInfo";
import Step3_ReviewSubmit from "./Step3_Review";

export default function RegistrationFlow() {
  const [step, setStep] = useState(1);
  const [groupData, setGroupData] = useState<any>({});
  const [projectData, setProjectData] = useState<any>({});
