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
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Registered Students</h2>
            <Button onClick={() => setMode("form")}>+ Add Student</Button>
          </div>

          <div className="max-w-sm">
            <Input
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="w-full table-auto bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((user) => (
                <tr key={user.ID} className="border-t">
                  <td className="p-2">{user.ID}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                  <td className="p-2 space-x-2">
                    <Button size="sm" onClick={() => handleEdit(user)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user.ID)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {mode === "form" && (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-2xl font-semibold mb-4">
            {editId ? "Edit Student" : "Register New Student"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
          </form>
        </div>
      )}
    </div>
  );
}
