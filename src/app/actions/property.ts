import apiClient from "./apiClient";

export const getPropertyRequest = async () => {
  try {
    const res: any = apiClient.get("/property-requests/get-all");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getContract = async (query: string, currentPage: number) => {
  try {
    const res: any = apiClient.get(
      `/property-verifications/contracts?ownerName=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
