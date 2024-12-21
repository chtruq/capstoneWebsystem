import apiClient from "./apiClient";

export const getMemberByTeam = async (
  id: string,
  currentPage: number,
  query: string
) => {
  const res = await apiClient.get(
    `/teammembers/search?name=${query}&teamId=${id}&pageIndex=${currentPage}&pageSize=10`
  );
  // console.log("res teamm", res.data);

  return res.data;
};
