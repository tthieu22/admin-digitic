import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const uploadImg = async (data) => {
  const reponse = await axios.post(`${base_url}`, data, config);
  return reponse.data;
};
const uploadService = {
  uploadImg,
};

export default uploadService;
