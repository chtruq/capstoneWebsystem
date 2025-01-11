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

      {/* <p className="font-semibold">Danh sách cuộc trò chuyện</p> */}
      {/* if userInfo.id != chat.receiveId, then disable button */}

      <div className="grid grid-cols-4">
        {data?.map((chat: Chat, index) => {
          return (
            <div
              key={chat.id}
              // className="flex items-center justify-between p-4 border-b border-gray-200"
              className=" p-4 border-b border-gray-200"
            >
              <Button
                className="w-full flex flex-col h-24"
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
                  <p className="font-semibold">Nhân viên hỗ trợ: {chat?.staffName}</p>
                ) : (
                  <p className="font-semibold">Chưa có nhân viên hỗ trợ</p>
                )}
              </Button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ChatList;
