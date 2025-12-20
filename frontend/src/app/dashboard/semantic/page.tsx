"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { semanticSearch, registerProject, checkRegistrationStatus } from "@/lib/api";
import Step1 from "./Registaration/Step1_GroupInfo";
import Step2 from "./Registaration/Step2_ProjectInfo";
import Step3 from "./Registaration/Step3_Review";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { parseJwt } from "@/lib/jwt";

export default function SemanticSearchPage() {
  const [title, setTitle] = useState("");
  const [threshold, setThreshold] = useState(0.55);
  const [results, setResults] = useState<any[]>([]);
  const [matchFound, setMatchFound] = useState(false);
  const [maxScore, setMaxScore] = useState(0.55);
  const [searched, setSearched] = useState(false);
  const [titleAccepted, setTitleAccepted] = useState(false);
  const [step, setStep] = useState(0);
  const [groupData, setGroupData] = useState<any>({});
  const [projectData, setProjectData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = Cookies.get("token");
  const { user_id: userId } = token ? parseJwt(token) : { user_id: null };

  const handleSearch = async () => {
    if (!title.trim()) {
      toast.warning("Please enter a project title.");
      return;
    }

    try {
      const res = await semanticSearch(title, threshold);
      setResults(res.matches || []);
      setMaxScore(res.max_score || 0.55);
      setMatchFound(res.match_found);
      setSearched(true);
    } catch (err) {
      toast.error("Search failed. Try again.");
    }
  };

  const handleFinalSubmit = async () => {
    const payload = {
      group_number: groupData.groupNumber,
      supervisor: groupData.supervisor,
      student_ids: groupData.studentIds,
      title,
      area: projectData.area,
      year: projectData.graduationYear,
    };

    try {
      setSubmitting(true);
      await registerProject(payload);
      toast.success("✅ Project registered successfully!");
      setStep(0);
      setGroupData({});
      setProjectData({});
      setTitle("");
      setSearched(false);
      setResults([]);
    } catch (err: any) {
      toast.error(`❌ ${err}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {step === 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">🎓 Semantic Search</h1>
          <Input
            placeholder="Enter project title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSearched(false);
              setThreshold(0.55);
            }}
            className="mb-4"
          />
          <div className="mb-4">
            <p className="mb-2 text-sm">Similarity Threshold: {threshold.toFixed(2)}</p>
            <Slider
              min={0.5}
              max={Math.max(maxScore, 0.55)}
              step={0.01}
              defaultValue={[threshold]}
              onValueChange={(val) => setThreshold(val[0])}
              className="bg-red-400"
            />
          </div>
          <Button onClick={handleSearch} className="mb-6 bg-[#0f172a] text-white">
            🔍 Search
          </Button>

          {searched && (
            <>
              <h2 className="text-xl font-semibold mb-2">Results</h2>
              {matchFound ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell>{r.title}</TableCell>
                        <TableCell>{r.score.toFixed(4)}</TableCell>
                        <TableCell>{r.category}</TableCell>
                        <TableCell>{r.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                !titleAccepted ? (
                  <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-md shadow">
                    ✅ No similar title found. You can register this title.
                    <Button
                      className="mt-3 bg-[#0f172a] text-white"
                      onClick={async () => {
                        try {
                          const res = await checkRegistrationStatus();

                          if (res.status === "accepted") {
                            setTitleAccepted(true);
                            toast.success("🎉 Your project title has already been accepted. Congratulations!", {
                              icon: "🎓",
                              style: {
                                background: "#d1fae5",
                                color: "#065f46",
                                border: "1px solid #34d399",
                                fontWeight: "bold",
                                fontSize: "16px",
                              },
                            });
                            return;
                          }

                          if (res.status === "pending_or_rejected") {
                            setGroupData({
                              groupNumber: res.group.group_number,
                              supervisor: res.group.supervisor,
                              studentIds: res.group.student_ids,
                            });
                            setStep(2);
                          } else {
                            setStep(1); // new user
                          }
                        } catch (err) {
                          toast.error("❌ Failed to check student registration.");
                        }
                      }}
                    >
                      🎨 Register This Title
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 bg-blue-100 border border-blue-300 text-blue-900 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-2">🎓 Title Already Accepted</h2>
                    <p>Your project title has already been approved. No further action is needed. 🥳</p>
                  </div>
                )
              )}
            </>
          )}
        </>
      )}

      {step === 1 && (
        <Step1
          onNext={(data) => {
            setGroupData(data);
            setStep(2);
          }}
          setStep={setStep}
          setFormData={setGroupData}
          formData={groupData}
          userId={userId}
          setError={setError}
        />
      )}

      {step === 2 && (
        <Step2
          data={{ studentIds: groupData.studentIds, title }}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setProjectData(data);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <Step3
          data={{
            groupNumber: groupData.groupNumber,
            supervisor: groupData.supervisor,
            studentIds: groupData.studentIds,
            title,
            area: projectData.area,
            graduationYear: projectData.graduationYear,
          }}
          onBack={() => setStep(2)}
          onSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
}
