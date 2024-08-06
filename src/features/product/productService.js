import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Function to get users
const getProducts = async () => {
  try {
    const response = await axios.get(`${base_url}product`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};
const createProduct = async (product) => {
  try {
    const response = await axios.post(`${base_url}product`, product, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error;
  }
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
