import apiClient from "./apiClient";

export const getProviders = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res =
      apiClient.get(`/projectproviders/search?providerName=${query}&pageIndex=${currentPage}&pageSize=10
            `);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
