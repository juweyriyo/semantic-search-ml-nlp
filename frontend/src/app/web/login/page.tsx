"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function StudentLoginPage() {
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
      localStorage.setItem("token", token); 
      Cookies.set("token", token, {
        expires: 7,
        secure: false,
        sameSite: "strict",
      });

      if (user.role === "student") {
        router.push("/dashboard");
      } else {
        alert("Access denied. Only student allowed.");
      }
    } catch (error: any) {
      alert("Invalid credentials. Please try again.");
      console.error(error);
    }
  };
