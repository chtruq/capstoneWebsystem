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
  console.log("abc", query);
  const url = `/apartments/search?apartmentName=${query}&page=${currentPage}&pageSize=1`;
  console.log("Request URL:", url);

  try {
    const res = apiClient.get(
      `/apartments/search?apartmentName=${query}&pageIndex=${currentPage}&pageSize=1`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
