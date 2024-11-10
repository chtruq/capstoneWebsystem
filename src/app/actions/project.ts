import apiClient from "./apiClient";

interface ProjectParams {
  projectName?: string;
  statuses?: number[];
  minPrice?: number;
  maxPrice?: number;
  pageIndex?: number;
  pageSize?: number;
}

export const getProjectApartment = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/projects/search?projectName=${query}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};
