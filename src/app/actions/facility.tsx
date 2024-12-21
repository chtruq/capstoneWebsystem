import apiClient from "./apiClient";

export const getFacilities = async () => {
  const res = await apiClient.get("/facilities/get-all");
  return res.data;
};

export const createFacilities = async (data) => {
  const res = await apiClient.post("/facilities/create", data);
  return res.data;
};
