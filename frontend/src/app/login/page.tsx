"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        user_id: userId,
        password: password,
      });

      const { token, user } = res.data;

      Cookies.set("token", token, {
        expires: 7,
        secure: false,
        sameSite: "strict",
      });

      if (user.role === "Admin") {
        router.push("/dashboard");
      } else {
        alert("Access denied. Only admin allowed.");
      }
    } catch (error: any) {
      alert("Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Image */}
      <div className="hidden md:flex items-center justify-center ">
        <img
          src="/images/admin-login .png" // 🖼️ Replace with your actual image path in public/
          alt="student Login"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center bg-background text-foreground">
        <div className="p-10 rounded-2xl shadow-md w-full max-w-md border border-muted">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Admin Login</h2>

          <div className="space-y-4">
            <Input
              placeholder="Enter Admin ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
