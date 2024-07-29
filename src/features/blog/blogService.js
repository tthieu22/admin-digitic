import axios from "axios";
import { base_url } from "../../utils/base_url";

// Function to get users
const getBlog = async () => {
  try {
    const response = await axios.get(`${base_url}blog/get-all-blog`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};

const blogService = {
  getBlog,
};

export default blogService;
