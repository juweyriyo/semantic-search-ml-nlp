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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">🎓 Project Registration</h1>
      {step === 1 && (
        <Step1_GroupInfo onNext={(data) => {
          setGroupData(data);
          setStep(2);
        }} />
      )}
      {step === 2 && (
        <Step2_ProjectInfo
          data={groupData}
          onNext={(data) => {
            setProjectData(data);
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3_ReviewSubmit
          data={{
            groupNumber: groupData.groupNumber,
            supervisor: groupData.supervisor,
            studentIds: groupData.studentIds,
            title: projectData.title,
            area: projectData.area,
            graduationYear: projectData.graduationYear
          }}
          onBack={() => setStep(2)}
          onSubmit={() => {
            console.log("✅ Submit here to backend");
          }}
        />
      )}
    </div>
  );
}
