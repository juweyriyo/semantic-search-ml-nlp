"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type Graduate = {
  _id?: string;
  student_id: string;
  name: string;
  department: string;
  graduation_year: number;
};

export default function GraduatesPage() {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [formData, setFormData] = useState<Graduate>({
    student_id: "",
    name: "",
    department: "",
    graduation_year: new Date().getFullYear(),
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGraduates();
  }, []);

  const fetchGraduates = async () => {
    try {
      const res = await axios.get("http://localhost:8000/graduates");
      setGraduates(res.data);
    } catch (err) {
      console.error("Error fetching graduates", err);
    }
  };

}
