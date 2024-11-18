import apiClient from "./apiClient";

export const getFacilities = async () => {
  try {
    const res = await apiClient.get("/facilities/get-all");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createFacilities = async (data) => {
  try {
    const res = await apiClient.post("/facilities/create", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
