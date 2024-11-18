import apiClient from "./apiClient";

export const getTeams = async () => {
  try {
    const res = await apiClient.get("/teams/get-all");
    return res.data;
  } catch (error) {
    throw error;
  }
};
