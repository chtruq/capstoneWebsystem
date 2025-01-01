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

export const getRevenueSumary = async (year: number) => {
  try {
    const res = await apiClient.get(`/statistics/revenue-summary?period=year&year=${year}`);
    console.log("Revenue Sumary", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

