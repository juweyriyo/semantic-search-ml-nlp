"use client";

import { useEffect, useState } from "react";
import { fetchAllSubmissions, acceptSubmission } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BsListCheck } from "react-icons/bs";
import { FaUserGraduate, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

export default function StudentSubmissionsPage() {
  const [groups, setGroups] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

}