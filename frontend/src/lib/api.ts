// imports
import axios from "axios";
import Cookies from "js-cookie";

// token
const token = Cookies.get("token");
console.log("📌 Frontend Token:", token);

// URL-ka production
const API_BASE = "API_BASE"; 