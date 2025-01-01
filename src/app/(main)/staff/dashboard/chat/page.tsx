import { getUserInforFromCookie } from "@/app/actions/auth";
import { getListChat } from "@/app/actions/chat";
import ChatList from "@/components/chat/ChatList";
import { cookies } from "next/headers";
import React from "react";

const ChatPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("Token in ChatPage", token?.value);
  const chatList = await getListChat();
  const userToken = await getUserInforFromCookie();
  return (
    <div>
      <p>Tư vấn khách hàng</p>
      {userToken && (
        <ChatList
          data={chatList?.data}
          userInfo={userToken}
          token={token?.value || ""}
        />
      )}
    </div>
  );
};

export default ChatPage;
