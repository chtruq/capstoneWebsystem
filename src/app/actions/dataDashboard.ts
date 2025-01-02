import apiClient from "./apiClient";

export const getStatistics = async (duratuion: string) => {
  try {
    console.log("Durationnnnnn", duratuion);
    
    const res = await apiClient.get(`/statistics?timePeriod=${duratuion}`);
    console.log("Data in getStatistics", res.data.data);
    
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

export const getRevenueChart = async (year: number) => {
  try {
    const res = await apiClient.get(`/statistics/revenue-summary?period=year&year=${year}`);
    console.log("Revenue Sumary", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

