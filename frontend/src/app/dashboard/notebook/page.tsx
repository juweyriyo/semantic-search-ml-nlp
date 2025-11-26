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

}
