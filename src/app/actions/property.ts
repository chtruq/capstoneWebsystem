import apiClient from "./apiClient";

export const getPropertyRequest = async () => {
  try {
    const res: any = apiClient.get("/property-requests/get-all");
    return res;
  } catch (error) {
    console.log(error);
  }
};
