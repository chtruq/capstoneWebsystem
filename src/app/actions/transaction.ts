import apiClient from "./apiClient";

export const getTransactions = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  try {
    const res: any = await apiClient.get(
      `/transactions/search?pageIndex=${currentPage}&pageSize=10`
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
