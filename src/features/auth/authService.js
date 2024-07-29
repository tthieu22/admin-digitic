import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const login = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getOrders = async () => {
  try {
    const response = await axios.get(
      `${base_url}user/order/get-all-order`,
      config
    );
    // console.log("Fetched orders:", response.data); // Kiểm tra dữ liệu
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error.response?.data || error;
  }
};

const authService = {
  login,
  getOrders,
};

export default authService;
