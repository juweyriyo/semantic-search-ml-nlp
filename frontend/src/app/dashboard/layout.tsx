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

  if (loading || !user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user.role} onLogout={() => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        router.push("/login");
      }} />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
