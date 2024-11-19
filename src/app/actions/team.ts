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
      `/teams/search?teamName=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTeamById = async (id: string) => {
  try {
    const res = await apiClient.get(`/teams/${id}`);
    return res.data;
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
