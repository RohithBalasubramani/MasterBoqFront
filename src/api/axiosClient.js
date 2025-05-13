import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://www.boqmasteradmin.com",
  timeout: 10000,
});

export default axiosClient;
