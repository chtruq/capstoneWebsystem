import apiClient from "./apiClient";

const getRequestList = async (page: number, limit: number) => {
  const res = await apiClient.get(
    `/deposits/get-all?page=${page}&limit=${limit}`
  );
  return res.data;
};
