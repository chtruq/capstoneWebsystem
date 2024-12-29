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
