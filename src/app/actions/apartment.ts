import apiClient from "./apiClient";

export const getApartments = async (page: number, pageIndex: number) => {
  try {
    const response = await apiClient.get(
      `/apartments/search?pageIndex=${page}&pageSize=${pageIndex}`
    );
    const data = await response.data;
    return data.data;
  } catch (e) {
    throw e;
  }
};

export const getApartmentsTest = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = apiClient.get(
      `/apartments/search?apartmentName=${query}&pageIndex=${currentPage}&pageSize=8`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getApartmentsPendingRequest = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  try {
    const res = apiClient.get(
      `/apartments/search?apartmentStatuses=0&pageIndex=${currentPage}&pageSize=10`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectApartmentCart = async ({
  currentPage,
  projectId,
}: {
  currentPage: number;
  projectId: string;
}) => {
  try {
    const res = await apiClient.get(
      `/apartments/search?projectId=${projectId}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching project apartments:", error);
    throw error;
  }
};

export const getApartmentDetails = async ({ id }: { id: string }) => {
  try {
    const res = await apiClient.get(`/apartments/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching apartment details:", error);
    throw error;
  }
};

export const approveApartment = async ({ id }: { id: string }) => {
  try {
    console.log("Approve apartment id:", id);
    
    const res = await apiClient.put(`/apartments/approve/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error approve apartment:", error);
    throw error;
  }
};

export const rejectApartment = async ({ id }: { id: string }) => {
  try {
    const res = await apiClient.put(`/apartments/reject/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error approve apartment:", error);
    throw error;
  }
};

export const getPendingApartments = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  try {
    const res = await apiClient.get(
      `/apartments/search?status=2&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching pending apartments:", error);
    throw error;
  }
};
