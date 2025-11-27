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

}
