import axios from "axios";
import { base_url } from "../../utils/base_url";

// Function to get users
const getBrand = async () => {
  try {
    const response = await axios.get(`${base_url}brand/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};

const brandService = {
  getBrand,
};

export default brandService;
