import apiClient from "./apiClient";

export const getTeams = async () => {
  try {
    const res = await apiClient.get("/teams/get-all");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTeamsByPage = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/teams/search?keyWord=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTeamByTeamId = async (id: string) => {
  try {
    const res = await apiClient.get(`/teams/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTeamByAccountId = async (id: string) => {
  try {
    const res = await apiClient.get(`/teams/search?accountId=${id}`);
    return res.data.data.teams[0];
  } catch (error) {
    throw error;
  }
};

export const getTeamMember = async ({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) => {
  try {
    const res = await apiClient.get(
      `/teammembers/search?pageIndex=${currentPage}&pageSize=10`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getLeader = async () => {
  try {
    const res = await apiClient.get("/teams/staff/available");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createTeam = async (data: any) => {
  try {
    console.log("data team create", data);
    
    const res = await apiClient.post("/teams/create", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMemberInTeamDetails = async (
  id: string,
  currentPage: number
) => {
  try {
    const res = await apiClient.get(
      `/teams/${id}/details?pageIndex=${currentPage}&pageSize=10`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
