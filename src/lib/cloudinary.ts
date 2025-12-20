import axios from "axios";

export const uploadImage = async (file: File): Promise<string> => {
  const CLOUD_NAME = "dleley1gv"; 
  const UPLOAD_PRESET = "unsigned_preset"; 
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, 
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}; 
