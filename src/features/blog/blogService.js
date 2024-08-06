import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

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
const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${base_url}blog`, blogData, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};
const blogService = {
  getBlog,
  createBlog,
};

export default blogService;
