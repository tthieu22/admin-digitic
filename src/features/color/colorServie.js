import axios from "axios";
import { base_url } from "../../utils/base_url";

// Function to get users
const getColor = async () => {
  try {
    const response = await axios.get(`${base_url}color`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};

const colorService = {
  getColor,
};

export default colorService;
