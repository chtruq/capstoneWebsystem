import apiClient from "./apiClient";

export const getUsers = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const response = await apiClient.get(
      `/accounts/search?name=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    const data = await response.data;
    return data.data;
  } catch (e) {
    throw e;
  }
};
