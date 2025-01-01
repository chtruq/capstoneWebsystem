import apiClient from "./apiClient";

export const getNotification = async (accoundId: string) => {
  const res = await apiClient.get(
    `/notifications/search?accountId=${accoundId}&pageIndex=1&pageSize=100`
  );
  return res.data;
};

export const markAsReadAll = async (accountId: string) => {
  const res = await apiClient.put(
    `/notifications/mark-all-as-read/${accountId}`
  );
  return res.data;
};

export const markAsRead = async (notificationId: string) => {
  const res = await apiClient.put(
    `/notifications/${notificationId}/mark-as-read`
  );
  return res.data;
};
