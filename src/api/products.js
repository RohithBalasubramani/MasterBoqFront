import axiosClient from "./axiosClient";

/* GET list or paginated url */
export const fetchProducts = async (url = "/product/") => {
  const { data } = await axiosClient.get(url);
  return data; // { count, next, results }
};

/* POST filter payload */
export const fetchFiltered = async (payload, url = "/product/filter/") => {
  const { data } = await axiosClient.post(url, payload);
  return data;
};
