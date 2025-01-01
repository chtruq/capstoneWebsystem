import { getUserInforFromCookie } from "@/app/actions/auth";
import { chatMessages } from "@/app/actions/chat";
import ChatComponent from "@/components/chat/ChatComponent";
import LeaveChatComponent from "@/components/chat/LeaveChat";
import { cookies } from "next/headers";
import React from "react";

const DetailsMessage = async ({ params }: { params: { id: string } }) => {
  const data = await chatMessages(params.id);
  console.log("dataaaa", data);
  const userId = (await getUserInforFromCookie()) || {
    id: "",
    role: "",
    name: "",
  };

  const cookieStore = cookies();
  const userToken = cookieStore.get("token")?.value || "";

  return (
    <div>
      <LeaveChatComponent sessionId={params.id} userId={userId} />
      <ChatComponent
        sessionId={params.id}
        data={data?.data?.results}
        userId={userId}
        userToken={userToken}
      />
    </div>
  );
};

export default DetailsMessage;
