import axios from "axios";
import { base_url } from "../../utils/base_url";

// Function to get users
const getUser = async () => {
  try {
    const response = await axios.get(`${base_url}user/all-users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};

const customerService = {
  getUser,
};

export default customerService;
