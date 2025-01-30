import axios from "axios";
import { getAuthData } from "../Hooks/useSecurity";
import HandleError from "../Hooks/HandleError";

export const getServiceStations = async ({ url }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.get(`https://vertix-nine.vercel.app/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    HandleError(err);
    if (err.status === 404) return [];
  }
};
export const updatePackage = async ({ url, id, updatedData }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.patch(
      `https://vertix-nine.vercel.app/${url}/${id}`,
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
export const postPackage = async ({ url, data }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.post(
      `https://vertix-nine.vercel.app/${url}`,
      data,
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
export const deletePackage = async ({ url, id }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.delete(
      `https://vertix-nine.vercel.app/${url}/${id}`,
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
