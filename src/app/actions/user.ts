import apiClient from "./apiClient";

export const getUsers = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const response = await apiClient.get(
    `/accounts/search?name=${query}&pageIndex=${currentPage}&pageSize=10`
  );
  const data = await response.data;
  return data.data;
};

export const getUser = async (id: string) => {
  const response = await apiClient.get(`/accounts/${id}`);
  const data = await response.data;
  return data.data;
};

export const lockAccount = async (id: string) => {
  const response = await apiClient.post(`/accounts/block-account/${id}`);
  const data = await response.data;
  return data.data;
};

export const creatAccount = async (data: any) => {
  const response = await apiClient.post(`/accounts/create-account`, data);
  return response.data;
};
