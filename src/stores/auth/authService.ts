import axios from "axios";
import { Cookies } from "react-cookie";

type FormData = {
  email: string;
  password: string;
};
const cookies = new Cookies();

// Register user
const register = async (userData: any): Promise<any> => {
  const response = await axios.post(import.meta.env.VITE_BACKEND_API, userData);
  const cookies = new Cookies();

  if (response.data) {
    cookies.set("user", JSON.stringify(response.data), { path: "/" });
  }

  return response.data;
};

// Login user
const login = async (formData: FormData): Promise<any> => {
  const response = await axios.post(import.meta.env.VITE_BACKEND_API + "login", formData, {
    withCredentials: true
  });
  
  const {token, refreshToken, ...user} = response.data; 

  if (response.data) {
    cookies.set("user", JSON.stringify(user), { path: "/" });
    cookies.set("token", JSON.stringify(token), { path: "/" });
    cookies.set("refreshToken", JSON.stringify(refreshToken), { path: "/" });
  }

  return user;
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
  // useRefreshToken
};

export default authService;
