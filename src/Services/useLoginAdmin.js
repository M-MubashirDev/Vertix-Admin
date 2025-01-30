import axios from "axios";
import { setAuthData } from "../Hooks/useSecurity";

const loginAdmin = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "https://vertix-nine.vercel.app/api/login",
      {
        email,
        password,
      }
    );

    if (response?.data?.user?.role !== "admin") {
      throw new Error("Wrong Credentials for Admin");
    }

    const { token, user } = response.data;
    setAuthData({ token, user }); // Save data with a unique key

    return { success: true, token };
  } catch (error) {
    console.error(
      "Login error response:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default loginAdmin;
