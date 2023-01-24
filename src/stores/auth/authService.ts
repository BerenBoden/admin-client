import axios from "axios";
import { Cookies } from "react-cookie";
const SERVER_API = import.meta.env.VITE_NODE_ENV = 'production' ? import.meta.env.VITE_SERVER_API : 'http://localhost:5000';

type FormData = {
  email: string;
  password: string;
};
const cookies = new Cookies();

// Register user
const register = async (userData: any): Promise<any> => {
  const response = await axios.post(SERVER_API, userData);
  const cookies = new Cookies();

  if (response.data) {
    cookies.set("user", JSON.stringify(response.data), { path: "/" });
  }

  return response.data;
};

// Login user
const login = async (formData: FormData): Promise<any> => {
  const response = await axios.post(
    `${SERVER_API}/api/authentication/login`,
    formData
  );

  const { token, ...user } = response.data;

if (response.data) {
    cookies.set("user", JSON.stringify(user), { path: "/" });
    cookies.set("token", JSON.stringify(token), { path: "/" });
  }

  return user;
};

// Logout user
const logout = () => {
  cookies.remove("user", { path: "/" });
  cookies.remove("token", { path: "/" });
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
