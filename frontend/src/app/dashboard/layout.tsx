// app/dashboard/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Sidebar from "@/components/sidebar/Sidebar";

type Props = { children: React.ReactNode };
type UserType = { name: string; role: "Admin" | "Student" };

export default function DashboardLayout({ children }: Props) {
  
}
