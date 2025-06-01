import axios from "axios";
import {toast} from 'react-toastify'
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

// const getAuthToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) toast.error("No auth token");
//   return token;
// };

export const getProjects = async () => {
  try {
    // const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/projects`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // You can check error.response.status, error.message etc
      toast.error(
        `API Error: ${error.response?.status} ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
};
