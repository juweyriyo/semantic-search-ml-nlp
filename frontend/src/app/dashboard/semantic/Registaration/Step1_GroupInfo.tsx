// ✅ Updated Step1_GroupInfo.tsx with professional validation UI
"use client";
import { useState, useEffect } from "react";
import { getStudentSubmission } from "@/lib/api"; // adjust path if needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkGraduate, checkStudentGroup } from "@/lib/api";
import clsx from "clsx";
