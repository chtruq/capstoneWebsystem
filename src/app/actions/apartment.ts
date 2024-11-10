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
      `/apartments/search?apartmentName=${query}&pageIndex=${currentPage}&pageSize=1`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
