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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/update-graduate/${editId}`, formData);
      } else {
        await axios.post("http://localhost:8000/register-graduate", formData);
      }
      resetForm();
      fetchGraduates();
    } catch (err) {
      console.error("Error submitting graduate", err);
    }
  };

  const handleEdit = (grad: Graduate) => {
    setFormData({
      student_id: grad.student_id,
      name: grad.name,
      department: grad.department,
      graduation_year: grad.graduation_year,
    });
    setEditId(grad._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to delete this graduate?")) return;
    try {
      await axios.delete(`http://localhost:8000/delete-graduate/${id}`);
      fetchGraduates();
    } catch (err) {
      console.error("Error deleting graduate", err);
    }
  };

  const resetForm = () => {
    setFormData({
      student_id: "",
      name: "",
      department: "",
      graduation_year: new Date().getFullYear(),
    });
    setEditId(null);
    setShowForm(false);
  };

  const filteredGraduates = graduates.filter(
    (grad) =>
      grad.department.toLowerCase().includes(search.toLowerCase()) ||
      grad.graduation_year.toString().includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Graduating Students - {new Date().getFullYear()}</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>+ Add Graduate</Button>
        )}
      </div>

      <div className="max-w-sm">
        <Input
          placeholder="Search by Department or Year"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md bg-white p-4 rounded shadow"
        >
          <Input
            placeholder="Student ID"
            value={formData.student_id}
            onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
            required
          />
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Graduation Year"
            value={formData.graduation_year}
            onChange={(e) =>
              setFormData({ ...formData, graduation_year: parseInt(e.target.value) })
            }
            required
          />
          <div className="flex gap-2">
            <Button type="submit">{editId ? "Update" : "Register"}</Button>
            <Button type="button" variant="ghost" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <table className="w-full table-auto bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Student ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Year</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGraduates.map((grad) => (
              <tr key={grad._id} className="border-t">
                <td className="p-2">{grad.student_id}</td>
                <td className="p-2">{grad.name}</td>
                <td className="p-2">{grad.department}</td>
                <td className="p-2">{grad.graduation_year}</td>
                <td className="p-2 space-x-2">
                  <Button size="sm" onClick={() => handleEdit(grad)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(grad._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
