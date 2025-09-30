// imports
import axios from "axios";
import Cookies from "js-cookie";

// token
const token = Cookies.get("token");
console.log("📌 Frontend Token:", token);

// URL-ka production
const API_BASE = "API_BASE"; 

//Top 3 category
export async function getTop3Categories() {
  const res = await fetch("API_BASE/top3");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getTopCategories() {
  const res = await fetch("API_BASE/category/top3");
  return await res.json();
}

//All category
export const getAllCategoryData = async () => {
  const response = await axios.get("API_BASE/category/all");
  console.log("API response:", response.data); 
  return response.data; 
};

//URL
const API = axios.create({
  baseURL: "API_BASE",
});

// title threshold
export const semanticSearch = async (title: string, threshold = 0.55) => {
  const res = await API.post("/semantic-search", { title, threshold });
  return res.data;
};

// ragistar form
export async function checkGraduate(studentId: string) {
  const res = await fetch(`API_BASE/api/check-graduate/${studentId}`);
  if (!res.ok) throw new Error("Graduate check failed");
  return await res.json();
}

//ragistar StudentGroup
export async function checkStudentGroup(studentId: string) {
  const res = await fetch(`API_BASE/api/check-student/${studentId}`);
  if (!res.ok) throw new Error("Student group check failed");
  return await res.json();
}

//registerProject
export async function registerProject(data: any) {
  try {
    const response = await axios.post(`${API_BASE}/api/register-project`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.detail || "Registration failed";
  }
}

// 🟢 Check student registration status
export const checkRegistrationStatus = async () => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get("API_BASE/api/check-registration-status", {
      headers: {
        Authorization: `Bearer ${token}`, // 👉 Add this line
      },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error checking registration status:", err);
    throw new Error("Failed to check registration status");
  }
};
