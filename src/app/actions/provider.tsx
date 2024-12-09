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
