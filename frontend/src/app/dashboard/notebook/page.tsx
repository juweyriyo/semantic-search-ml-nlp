"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getNotes, createNote, updateNote, deleteNote } from "@/lib/api"; // 👈 API calls

type Note = {
  _id: string;
  note: string;
  timestamp: string;
};

export default function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<{ [key: string]: string }>({});
  const [userId] = useState("C1210258"); // replace with session later

  const fetchNotes = async () => {
    const data = await getNotes(userId);
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async () => {
    if (!newNote.trim()) return;
    await createNote(userId, newNote);
    console.log("wa clic garesay");

    setNewNote("");
    fetchNotes();
  };

  const handleUpdate = async (id: string) => {
    if (!editingNote[id]) return;
    await updateNote(id, editingNote[id]);
    setEditingNote({ ...editingNote, [id]: "" });
    fetchNotes();
  };

}
