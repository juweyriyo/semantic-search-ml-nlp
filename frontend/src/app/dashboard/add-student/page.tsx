"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";

type User = {
  ID: string;
  name: string;
  role: string;
};

export default function AddStudentPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [formData, setFormData] = useState({ id: "", name: "", password: "" });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [mode, setMode] = useState<"table" | "form">("table");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8000/users");
    setStudents(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        const payload: any = {
            id: formData.id,
            name: formData.name,
        };
        if (formData.password.trim()) {
            payload.password = formData.password;
        }

        await axios.put(`http://localhost:8000/update-user/${editId}`, payload);
      } else {
        await axios.post("http://localhost:8000/register-user", {
          ...formData,
          role: "student",
        });
      }
      setFormData({ id: "", name: "", password: "" });
      setEditId(null);
      setMode("table");
      fetchStudents();
    } catch (err) {
      console.error("❌ Submit failed", err);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({ id: user.ID, name: user.name, password: "" });
    setEditId(user.ID);
    setMode("form");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this student?")) return;
    await axios.delete(`http://localhost:8000/delete-user/${id}`);
    fetchStudents();
  };

  const filteredStudents = students
    .filter((u) => u.role === "student")
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.ID.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      {mode === "table" && (
        <>
          
        </>
      )}

    </div>
  );
}
