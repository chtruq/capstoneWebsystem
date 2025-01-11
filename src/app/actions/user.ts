import { AxiosError } from "axios";
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
  const response = await apiClient.post(`/accounts/create-account`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

interface updateAccount {
  Name: string;
  PhoneNumber: string;
  UnlockAccount: string;
}

export const updateAccount = async (accountId: string, data: updateAccount) => {
  try {
    console.log("data in update account", data);
    console.log("accountId in update account", accountId);
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("PhoneNumber", data.PhoneNumber);
    formData.append("UnlockAccount", data.UnlockAccount);

    const res = await apiClient.put(`/accounts/update-account/${accountId}`, formData);
    return res;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};



export const updatePassword = async (accountId: string, currentPassword: string, newPassword: string) => {
  try {
    console.log("data in update password", accountId, currentPassword, newPassword);
    const res = await apiClient.post(`/auth/update-password?accountId=${accountId}&currentPassword=${currentPassword}&newPassword=${newPassword}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}