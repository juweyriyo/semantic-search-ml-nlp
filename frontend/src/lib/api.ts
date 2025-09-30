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