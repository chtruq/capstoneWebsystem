import apiClient from "./apiClient";

export const getApartments = async (page: number, pageIndex: number) => {
  try {
    const response = await apiClient.get(
      `/apartments/search?pageIndex=${page}&pageSize=${pageIndex}`
    );
    const data = await response.data;
    return data.data;
  } catch (e) {
    throw e;
  }
};
