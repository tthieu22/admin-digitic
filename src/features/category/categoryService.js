import axios from "axios";
import { base_url } from "../../utils/base_url";

// Function to get users
const getCategories = async () => {
  try {
    const response = await axios.get(`${base_url}category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};

const categoryService = {
  getCategories,
};

export default categoryService;