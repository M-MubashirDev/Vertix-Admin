import axios from "axios";
import HandleError from "../Hooks/HandleError";
//axios post the new client data and set the token
async function postClient({ url, data }) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/api/${url}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    HandleError(err);
  }
}

async function getClients({ url }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`http://localhost:5000/api/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    HandleError(err);
    console.log(err.status);
  }
}

async function deleteClients({ url, id }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/${url}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    HandleError(err);
  }
}
async function updateClients({ url, id, updatedData }) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.patch(
      `http://localhost:5000/api/${url}/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    HandleError(err);
  }
}

export { getClients, postClient, updateClients, deleteClients };
