import apiClient from "./apiClient";


export const getTransactionByPage = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    console.log("query", query);

    const res = await apiClient.get(
      `/transactions/search?transactionId=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
