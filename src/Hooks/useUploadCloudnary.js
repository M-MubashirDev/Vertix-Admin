// Hooks/useUploadCloudnary.js
import axios from "axios";

const handleUpload = async (selectedFile) => {
  if (!selectedFile) return null;

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("upload_preset", "vertix"); // Ensure this preset is created in Cloudinary

  try {
    // Correctly formatted Cloudinary endpoint
    const url = `https://api.cloudinary.com/v1_1/djvkj4ntb/upload`;
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Return the full response data, including URL
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default handleUpload;
