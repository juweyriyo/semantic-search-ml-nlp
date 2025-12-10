"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getStudentSubmissions } from "@/lib/api";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { MdOutlineTopic } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
