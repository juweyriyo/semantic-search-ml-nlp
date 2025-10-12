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
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const decoded = jwtDecode<UserType>(token);
      setUser(decoded);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, []);

}
