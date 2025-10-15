"use client";

import { useEffect, useState } from "react";
import { getTopCategories, getAllCategoryData } from "@/lib/api";
import { Bar, Pie, Line } from "react-chartjs-2";
import Select from "react-select";
import "chart.js/auto";
