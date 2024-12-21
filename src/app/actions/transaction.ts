import apiClient from "./apiClient";

export const getTransactionByPage = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  console.log("query", query);

  const res = await apiClient.get(
    `/transactions/search?keyword=${query}&pageIndex=${currentPage}&pageSize=10`
  );
  return res.data;
};
