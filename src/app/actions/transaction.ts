import apiClient from "./apiClient";

export const getTransactionByPage = async ({
  query,
  currentPage,
}: {
  query?: string;
  currentPage: number;
}) => {
  console.log("query", query);

  const res = await apiClient.get(
    `/transactions/search?keyword=${query}&pageIndex=${currentPage}&pageSize=10`
  );
  return res.data;
};


export const getTransactionByAccountId = async ({
  query,
  currentPage,
  accountId
}: {
  query?: string;
  currentPage: number;
  accountId: string;
}) => {
  console.log("query", query);

  const res = await apiClient.get(
    `/transactions/search?providerId=${accountId}&keyword=${query}&pageIndex=${currentPage}&pageSize=10`
  );
  return res.data;
};
