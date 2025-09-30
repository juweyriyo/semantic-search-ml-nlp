// imports
import axios from "axios";
import Cookies from "js-cookie";

// token
const token = Cookies.get("token");
console.log("📌 Frontend Token:", token);