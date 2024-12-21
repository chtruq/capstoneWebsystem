import apiClient from "./apiClient";

export const getTeams = async () => {
  const res = await apiClient.get("/teams/get-all");
  return res.data;
};

export const getTeamsByPage = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const res = await apiClient.get(
    `/teams/search?keyWord=${query}&pageIndex=${currentPage}&pageSize=10`
  );
  return res.data;
};

export const getTeamByTeamId = async (id: string) => {
  const res = await apiClient.get(`/teams/${id}`);
  return res.data;
};

export const getTeamByAccountId = async (id: string) => {
  const res = await apiClient.get(`/teams/search?accountId=${id}`);
  return res.data.data.teams[0];
};

export const getTeamMember = async ({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) => {
  const res = await apiClient.get(
    `/teammembers/search?pageIndex=${currentPage}&pageSize=10`
  );
  return res.data;
};

export const getLeader = async () => {
  const res = await apiClient.get("/teams/staff/available");
  return res.data;
};

export const createTeam = async (data: any) => {
  console.log("data team create", data);

  const res = await apiClient.post("/teams/create", data);
  return res.data;
};

export const getMemberInTeamDetails = async (
  id: string,
  currentPage: number
) => {
  const res = await apiClient.get(
    `/teams/${id}/details?pageIndex=${currentPage}&pageSize=10`
  );
  return res.data;
};
