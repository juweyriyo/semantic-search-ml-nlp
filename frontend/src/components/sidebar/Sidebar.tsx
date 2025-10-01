"use client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation"; 
import {
  LayoutDashboard,
  BarChart3,
  SearchCheck,
  Users2,
  NotebookText,
  UserCircle,
  FileText,
  PencilRuler,
  MailOpen   ,
  GraduationCap ,
  Icon,
} from "lucide-react";
import { group } from "console";

type SidebarProps = {
  role: "Admin" | "Student";
  onLogout: () => void;
};


export default function Sidebar({ role, onLogout }: SidebarProps) {
  const router = useRouter(); 
  const pathname = usePathname(); 

  const menu =
    role === "Admin"
      ? [
          { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
          { label: "Category", icon: BarChart3, key: "category" },
          { label: "Semantic Search", icon: SearchCheck, key: "semantic" },
          { label: "Add Student", icon: Users2, key: "add-student" },
          { label: "Graduate Year", icon: GraduationCap , key: "graduate-registration" },
          { label: "Student Submits", icon: MailOpen   , key: "submits" },
          // {lebal:  "", Icon:BarChart3, key:"graduate-registration"},
          { label: "Report", icon: FileText, key: "report" },
          { label: "User Info", icon: UserCircle, key: "profile" },
        ]
      : [
          { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
          { label: "Category", icon: BarChart3, key: "category" },
          { label: "Semantic Search", icon: SearchCheck, key: "semantic" },
          { label: "Your Submission", icon: PencilRuler, key: "submission" },
          { label: "Notebook", icon: NotebookText, key: "notebook" },
          { label: "User Info", icon: UserCircle, key: "profile" },
        ];
