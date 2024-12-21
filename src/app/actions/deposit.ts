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
    const res = await apiClient.get(
      `/deposits/search?projectApartmentId=${id}&depositStatus=1`
    );
    console.log("Data deposit 1", res);
    console.log("Data deposit 2", res.data);
    console.log("Data deposit 3", res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const approveDepositRequest = async ({
  depositRequestId,
  staffId,
}: {
  depositRequestId: string;
  staffId: string;
}) => {
  try {
    console.log("Approve apartment id:", depositRequestId);
    console.log("Approve staff id:", staffId);

    const res = await apiClient.post(
      `/deposits/accept/${depositRequestId}?TeamMemberID=${staffId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error approve apartment:", error);
    throw error;
  }
};

export const rejectDepositRequest = async ({
  depositRequestId,
}: {
  depositRequestId: string;
}) => {
  try {
    const res = await apiClient.post(`/deposits/reject/${depositRequestId}`);
    return res.data.data;
  } catch (error) {
    console.error("Error approve apartment:", error);
    throw error;
  }
};

export const getRequestDepositByTeam = async ({
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
      `/deposits/search?keyword=${query}&teamId=${teamID}&pageIndex=${currentPage}&pageSize=10`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
