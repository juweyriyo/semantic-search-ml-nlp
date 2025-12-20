"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { semanticSearch, registerProject, checkRegistrationStatus } from "@/lib/api";
import Step1 from "./Registaration/Step1_GroupInfo";
import Step2 from "./Registaration/Step2_ProjectInfo";
import Step3 from "./Registaration/Step3_Review";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { parseJwt } from "@/lib/jwt";
