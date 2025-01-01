"use client";
import { useSignalR } from "@/hooks/useSignalR";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { View } from "lucide-react";
import { joinChatSession } from "@/app/actions/chat";

const ChatList = ({
  token,
  data,
  userInfo,
}: {
  token: string;
  data: Chat[];
  userInfo: {
    id: string;
    role: string;
    name: string;
  };
}) => {
  const { isConnected, error } = useSignalR(token);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      {/* <span>{isConnected ? isConnected : error}</span> */}

      <p>Danh sách cuộc trò chuyện</p>
      {/* if userInfo.id != chat.receiveId, then disable button */}

      {data?.map((chat: Chat, index) => {
        return (
          <div
            key={chat.id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <Button
              className="w-full text-left items-start"
              onClick={() => {
                if (chat.supportStaffId === userInfo.id) {
                  router.push(`${pathname}/${chat.id}`);
                } else {
                  router.push(`${pathname}/${chat.id}`);
                  joinChatSession(chat.id, userInfo.id);
                }
              }}
              disabled={
                chat.supportStaffId != "00000000-0000-0000-0000-000000000000" &&
                chat.supportStaffId != userInfo.id
              }
            >
              <p className="text-left">Khách hàng: {chat?.cusotmerName}</p>
              {chat?.supportStaffId !=
              "00000000-0000-0000-0000-000000000000" ? (
                <p>Nhân viên hỗ trợ: {chat?.staffName}</p>
              ) : (
                <p>Chưa có nhân viên hỗ trợ</p>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
