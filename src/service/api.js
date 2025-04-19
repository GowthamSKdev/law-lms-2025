import axios from "axios";

const baseUrl = "https://law-lms.onrender.com";

export const AuthRegister = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const AuthLogin = async (data) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/login`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
