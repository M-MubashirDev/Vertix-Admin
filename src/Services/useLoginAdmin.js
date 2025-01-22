import axios from "axios";

const loginAdmin = async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    if (response?.data?.user?.role !== "admin") {
      throw new Error("Wronge Cradentials for Admin");
    }

    const { token } = response.data;
    console.log(response?.data?.user?.role, "🌏");
    localStorage.setItem("authToken", token);
    return { success: true, token };
  } catch (error) {
    console.error("Login error response:", error.response?.data); // Log server response
    throw error;
  }
};

export default loginAdmin;
