import { AxiosError } from "axios";
import apiClient from "./apiClient";

export const getProviders = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(`/projectproviders/search?providerName=${query}&pageIndex=${currentPage}&pageSize=10`);
    // console.log("res provide",res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProviders = async () => {
  try {
    const res: any = apiClient.get(`/projectproviders/get-all`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProviderDetails = async ({ id }: { id: string }) => {
  try {
    const res = await apiClient.get(`/projectproviders/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}


export const getProviderByAccountId = async ({ accountId }: { accountId: string }) => {
  try {
    console.log("get provider by account id", accountId);

    const res = await apiClient.get(`/projectproviders/search?accountId=${accountId}`);
    // console.log("res provide", res.data.data.providers);

    return res.data.data.providers;
  } catch (error) {
    console.log(error);
  }
}

interface createProvider {
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  ApartmentProjectProviderName: string;
  ApartmentProjectDescription: string;
  Location: string;
  DiagramUrl?: File | null;
}

export const createProvider = async (data: createProvider) => {
  try {
    console.log("data in create provider API", data);
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Email", data.Email);
    formData.append("Password", data.Password);
    formData.append("ConfirmPassword", data.ConfirmPassword);
    formData.append("ApartmentProjectProviderName", data.ApartmentProjectProviderName);
    formData.append("ApartmentProjectDescription", data.ApartmentProjectDescription);
    formData.append("Location", data.Location);
    if (data.DiagramUrl) {
      formData.append("DiagramUrl", data.DiagramUrl);
    }
    // Log formData
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const res = await apiClient.post("/projectproviders/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getProviderStatisticsByAccount = async ({ accountId, timePeriod }: { accountId: string, timePeriod: string }) => {
  try {
    console.log("get provider by account id", accountId);

    const res = await apiClient.get(`projectproviders/statistics-by-account?accountId=${accountId}&timePeriod=${timePeriod}`);
    // console.log("res provide", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}
