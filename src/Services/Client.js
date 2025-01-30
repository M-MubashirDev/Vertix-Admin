import axios from "axios";
import { getAuthData } from "../Hooks/useSecurity";
import HandleError from "../Hooks/HandleError";

export const postClient = async ({ url, data }) => {
  const { token } = getAuthData() || {}; // Get the token dynamically
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

export const getClients = async ({ url }) => {
  const { token } = getAuthData() || {};
  try {
    const response = await axios.get(`https://vertix-nine.vercel.app/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    HandleError(err);
    throw err;
  }
};

export const deleteClients = async ({ url, id }) => {
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

export const updateClients = async ({ url, id, updatedData }) => {
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
export async function getServiceStations({ url }) {
  const { token } = getAuthData() || {};

  try {
    const response = await axios.get(`https://vertix-nine.vercel.app/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return []; // Return an empty array for 404 errors
    }
    HandleError(err);
  }
}
