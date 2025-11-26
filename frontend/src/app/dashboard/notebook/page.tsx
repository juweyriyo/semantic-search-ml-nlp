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

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"> My Notebook</h1>

      {/* Add new note */}
      <div className="mb-6">
        <Textarea
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleCreate} className="bg-blue-700 text-white">
          ➕ Save Note
        </Button>
      </div>

      {/* Show existing notes */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-600">📭 No notes yet.</p>
        ) : (
          notes.map((note) => (
            <Card key={note._id} className="p-4 bg-white shadow-md">
              {editingNote[note._id] !== undefined ? (
                <>
                  <Textarea
                    value={editingNote[note._id]}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, [note._id]: e.target.value })
                    }
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(note._id)} className="bg-green-600 text-white">
                      💾 Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingNote((prev) => {
                        const newEdit = { ...prev };
                        delete newEdit[note._id];
                        return newEdit;
                      })}
                    >
                      ❌ Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="whitespace-pre-wrap">{note.note}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    🕒 {new Date(note.timestamp).toLocaleString()}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setEditingNote({ ...editingNote, [note._id]: note.note })
                      }
                    >
                      ✏️ Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(note._id)}>
                      🗑 Delete
                    </Button>
                  </div>
                </>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
