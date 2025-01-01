import apiClient from "./apiClient";
interface SendMessagePayload {
  sessionId: string;
  senderId: string;
  messageContent: string;
  imageUrl?: File | null;
}
export const getListChat = async () => {
  const res = await apiClient.get("/chats/sessions");
  return res.data;
};

export const chatMessages = async (sessionId: string) => {
  console.log("sessionId", sessionId);
  const res = await apiClient.get(
    `/chats/search?sessionId=${sessionId}&pageIndex=1&pageSize=20`
  );
  return res.data;
};

export const sendChat = async (data: SendMessagePayload, image?: File) => {
  console.log("Data in sendChat", data.imageUrl);
  console.log("Image in sendChat", image);
  const formData = new FormData();
  console.log("Sending data:", {
    SessionId: data.sessionId,
    SenderId: data.senderId,
    MessageContent: data.messageContent,
    ImageUrl: image,
  });
  formData.append("SessionId", data.sessionId);
  formData.append("SenderId", data.senderId);
  formData.append("MessageContent", data.messageContent);

  // Nếu có image thì mới append

  if (image) {
    formData.append("ImageUrl", image);
  }

  const res = await apiClient.post("/chats/send-message", formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data) => data,
  });
  return res.data;
};

export const joinChatSession = async (sessionId: string, staffId: string) => {
  const res = await apiClient.post(
    `/chats/assign-staff?sessionId=${sessionId}&staffId=${staffId}`
  );
  return res.data;
};

export const leaveChatSession = async (sessionId: string, staffId: string) => {
  const res = await apiClient.post(
    `/chats/staff-leave-session?sessionId=${sessionId}&staffId=${staffId}`
  );
  return res.data;
};
