import apiClient from "./apiClient";

export const getRequestAppointment = async () => {
  try {
    const res: any = apiClient.get("/appointmentrequests/get-all");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRequestAppointmentByTeam = async ({
  query,
  currentPage,
  teamID,
}: {
  query: string;
  currentPage: number;
  teamID: string;
}) => {
  try {
    const res = await apiClient.get(
      `/appointmentrequests/search?teamId=${teamID}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
