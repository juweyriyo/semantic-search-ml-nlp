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

    </div>
  );
}
