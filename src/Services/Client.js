import axios from "axios";
import { getAuthData } from "../Hooks/useSecurity";
import HandleError from "../Hooks/HandleError";

export const postClient = async ({ url, data }) => {
  const { token } = getAuthData() || {}; // Get the token dynamically
  try {
    const response = await axios.post(
      `http://localhost:5000/api/${url}`,
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
    const response = await axios.get(`http://localhost:5000/api/${url}`, {
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
      `http://localhost:5000/api/${url}/${id}`,
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
