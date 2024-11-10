import apiClient from "./apiClient";

export const getRequestAppointment = async () => {
  try {
    const res: any = apiClient.get("/appointmentrequests/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
