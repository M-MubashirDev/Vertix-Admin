import axios from "axios";
import { getAuthData } from "../Hooks/useSecurity";
import HandleError from "../Hooks/HandleError";

export const getServiceStations = async ({ url }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.get(`http://localhost:5000/api/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    HandleError(err);
    throw err;
  }
};
export const updatePackage = async ({ url, id, updatedData }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/${url}/${id}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    HandleError(err);
    throw err;
  }
};
