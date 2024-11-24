import apiClient from "./apiClient";

export const getDeposit = async () => {
  try {
    const res = await apiClient.get("/deposits/search?pageIndex=1&pageSize=20");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDepositByProjectId = async (id: string) => {
  try {
    const res = await apiClient.get(`/deposits/search?projectApartmentId=${id}&depositStatus=1`);
    console.log("Data deposit 1", res);
    console.log("Data deposit 2", res.data);
    console.log("Data deposit 3", res.data.data);
    
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
