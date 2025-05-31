import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

// const getAuthToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("No auth token");
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
      throw new Error(
        `API Error: ${error.response?.status} ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
};
