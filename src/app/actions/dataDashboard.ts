import apiClient from "./apiClient";

export const getStatistics = async () => {
  try {
    const res = await apiClient.get(`/statistics?timePeriod=all`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentCountByTpye = async () => {
  try {
    const res = await apiClient.get(`/statistics/appointment-count-by-type`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}