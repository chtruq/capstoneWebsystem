"use client";
import { getUserInforFromCookie } from "@/app/actions/auth";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageMinus, ImagePlus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { sendError } from "next/dist/server/api-utils";
import { chatMessages, sendChat } from "@/app/actions/chat";
import { useSignalR } from "@/hooks/useSignalR";
import { signalRService } from "../../../service/signalRService";

type ChatMessage = {
  id: string;
  sessionId: string;
  senderId: string;
  receiverId?: string;
  messageContent: string;
  timestamp: string;
  imageUrl?: string;
};

interface MessageData {
  sessionId: string;
  senderId: string;
  messageContent: string;
  imageUrl?: any;
}
const ChatComponent = ({
  data,
  userId,
  sessionId,
  userToken,
}: {
  data: ChatMessage[];
  userId: {
    id: string;
    role: string;
    name: string;
  };
  sessionId: string;
  userToken: string;
}) => {
  const { isConnected, error } = useSignalR(userToken);
  const [newReceiveMessage, setNewReceiveMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>(data);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    sessionId: sessionId,
    senderid: userId.id,
    messageContent: "",
    imageUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState<any>();

  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const fetchMessages = async () => {
    const data = await chatMessages(sessionId);
    const sortedMessages = sortMessages(data?.data?.results || []);
    setMessages(sortedMessages);
  };
  const handlePress = (item: ChatMessage) => {
    setExpandedItemId(expandedItemId === item.id ? null : item.id);
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const sortMessages = (messages: ChatMessage[]) => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };
  useEffect(() => {
    const checkConnection = async () => {
      if (!signalRService.isConnected()) {
        await signalRService.startConnection(userToken || "");
      }
      //   await fetchMessages();
      await connectToSignalR();
    };
    checkConnection();
  }, []);

  // Connect to SignalR
  const connectToSignalR = async () => {
    if (!userToken) {
      return;
    }
    console.log("Token được sử dụng:", userToken);
    await signalRService.startConnection(userToken);
    signalRService.setMessageCallback((message) => {
      console.log("Message received:chathub", message);
      setNewReceiveMessage(message);
      console.log("New message:", newReceiveMessage);
    });
  };

  useEffect(() => {
    const connection = signalRService.getConnection();

    if (!connection) return;
    connection.on("ReceiveChatMessage", () => {});
    connection.onclose(() => {
      reconnectToSignalR();
    });

    connection.onreconnecting(() => {});

    connection.onreconnected(() => {});

    return () => {
      signalRService.stopConnection();
    };
  }, []);

  // Reconnect Logic
  const reconnectToSignalR = () => {
    setTimeout(() => {
      connectToSignalR();
    }, 5000);
  };
  const displayMessage = (message: ChatMessage) => {
    const newMessage: ChatMessage = {
      id: message.id,
      sessionId: message.sessionId,
      senderId: message.senderId,
      receiverId: message.receiverId,
      messageContent: message.messageContent,
      timestamp: message.timestamp,
      imageUrl: message.imageUrl,
    };

    setMessages((prevMessages: any) => {
      const newMessages = [newMessage as ChatMessage, ...prevMessages];
      const uniqueMessages = Array.from(
        new Set(newMessages.map((msg) => msg.id))
      ).map((id) => newMessages.find((msg) => msg.id === id));
      return uniqueMessages;
    });
  };

  useEffect(() => {
    if (newReceiveMessage) {
      displayMessage(newReceiveMessage);
    }
  }, [newReceiveMessage]);

  const sendMessage = async () => {
    if (!form.messageContent && !selectedImage) return;

    const messageData: MessageData = {
      sessionId: sessionId,
      senderId: userId.id,
      messageContent: form.messageContent,
    };

    try {
      if (selectedImage?.uri) {
        // Convert the selected image (base64 or blob) to a File object
        const imageBlob = await fetch(selectedImage.uri).then((res) =>
          res.blob()
        );
        const file = new File([imageBlob], selectedImage.name, {
          type: selectedImage.type,
        });

        await sendChat({ ...messageData, imageUrl: file }, file);
      } else {
        await sendChat(messageData);
      }

      setForm({
        ...form,
        messageContent: "",
      });
      setSelectedImage(null);
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <>
      <div>
        {error && <div>{error}</div>}
        {/* {isConnected && <div>Đã kết nối </div>} */}
      </div>
      <ScrollArea
        className="h-full w-full overflow-y-auto"
        style={{
          height: "75vh",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <div className="w-full flex flex-col ">
          {sortMessages(messages)?.map((item: ChatMessage) => (
            <button
              onClick={() => handlePress(item)}
              key={item.id}
              className={`${
                item.senderId === userId?.id
                  ? "flex justify-end "
                  : "flex justify-start"
              }  p-2 rounded-xl m-2 w-full`}
            >
              <div
                className={`${
                  item.senderId === userId?.id
                    ? "bg-primary text-right text-white"
                    : " bg-gray-400 text-left text-white"
                }
                p-4 rounded-md max-w-[70%] 
              `}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                  />
                )}

                <div>
                  <p>{item.messageContent}</p>
                  {expandedItemId === item.id && (
                    <p className=" p-2 text-xs ">
                      {item?.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : "Invalid date"}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <div className="w-full flex items-center justify-between p-4">
        <Input
          type="text"
          placeholder="Nhập tin nhắn"
          className="w-4/5 p-2 rounded-lg"
          value={form.messageContent}
          onChange={(e) => {
            setForm({
              ...form,
              messageContent: e.target.value,
            });
          }}
        />
        <Input
          type="file"
          className="w-1/5 p-2 rounded-lg hidden"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setSelectedImage({
                  uri: e.target?.result,
                  type: file.type,
                  name: file.name,
                });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {selectedImage ? (
          <>
            <button
              onClick={() => {
                setSelectedImage(null);
              }}
            >
              <ImageMinus size={24} />
            </button>
            <img
              src={selectedImage.uri}
              alt="image"
              className="w-12 h-12 object-cover rounded-lg"
            />
          </>
        ) : (
          <button onClick={() => fileInputRef.current?.click()}>
            <ImagePlus size={24} />
          </button>
        )}

        {!form.messageContent && !selectedImage ? (
          <Button disabled variant="secondary">
            Gửi
          </Button>
        ) : (
          <Button onClick={sendMessage}>Gửi</Button>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
