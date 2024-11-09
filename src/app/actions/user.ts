import apiClient from "./apiClient";

export const getUsers = async (page: number, pageSize: number) => {
  try {
    const response = await apiClient.get(
      `/accounts/search
      
      `
      //   ?page=${page}&pageSize=${pageSize}
    );
    const data = await response.data;
    return data.data;
  } catch (e) {
    throw e;
  }
};
