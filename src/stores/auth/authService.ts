import axios from "axios";
import { Cookies } from "react-cookie";

const API_URL = "http://localhost:5000/api/authentication/";

type FormData = {
  email: string;
  password: string;
};
// Register user
const register = async (userData: any): Promise<any> => {
  const response = await axios.post(API_URL, userData);
  const cookies = new Cookies();

  if (response.data) {
    cookies.set("user", JSON.stringify(response.data), { path: "/" });
  }

  return response.data;
};

// Login user
const login = async (formData: FormData): Promise<any> => {
  const response = await axios.post(API_URL + "login", formData);
  const cookies = new Cookies();

  if (response.data) {
    cookies.set("user", JSON.stringify(response.data), { path: "/" });
  }

  return response.data;
};

// Logout user
const logout = () => {
  const cookies = new Cookies();
  cookies.remove("user", { path: "/" });
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
