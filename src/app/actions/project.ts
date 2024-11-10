import apiClient from "./apiClient";

interface ProjectParams {
  projectName?: string;
  statuses?: number[];
  minPrice?: number;
  maxPrice?: number;
  pageIndex?: number;
  pageSize?: number;
}

const getProjectApartment = async ({ params }: { params: ProjectParams }) => {
  try {
    console.log(params);
    const res = await apiClient.get("/projects/search?", {
      params: {
        ...params,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};

export default getProjectApartment;
