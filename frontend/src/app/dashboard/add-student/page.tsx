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

}
