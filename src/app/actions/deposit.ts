import apiClient from "./apiClient";

export const getDeposit = async () => {
  try {
    const res = await apiClient.get("/deposits/search?pageIndex=1&pageSize=20");
    return res;
  } catch (error) {
    console.log(error);
  }
};
