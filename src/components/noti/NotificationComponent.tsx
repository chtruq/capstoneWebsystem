"use client";
import React, { useEffect } from "react";
import { signalRService } from "../../../service/signalRService";
import { useSignalR } from "@/hooks/useSignalR";
import { Bell } from "lucide-react";
import {
  getNotification,
  markAsRead,
  markAsReadAll,
} from "@/app/actions/notification";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getDashboardBaseUrl } from "@/lib/utils/getPath";

const NotificationComponent = ({
  userInfo,
  userToken,
}: {
  userInfo: {
    id: string;
    name: string;
    role: string;
  };
  userToken: string;
}) => {
  const [notification, setNotification] = React.useState<Noti[]>([]);
  const [show, setShow] = React.useState<boolean>(false);
  const [unreadNoti, setUnreadNoti] = React.useState<number>(0);
  const [newReceivedNotification, setNewReceivedNotification] = React.useState<{
    accountId: string;
    title: string;
    description: string;
    type: string;
    referenceId: string;
  } | null>(null);
  // signal R
  const { error, isConnected } = useSignalR(userToken);

  const connectToSignalR = async () => {
    if (!userToken) {
      return;
    }
    console.log("Token được sử dụng:", userToken);
    await signalRService.startConnection(userToken);
    signalRService.setNotificationCallback((noti) => {
      console.log("Noti received", noti);
      setNewReceivedNotification(noti);
      console.log("New message:", newReceivedNotification);
    });
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
  useEffect(() => {
    const connection = signalRService.getConnection();

    if (!connection) return;
    connection.on("ReceiveNotification", () => {});
    connection.onclose(() => {
      reconnectToSignalR();
    });

    connection.onreconnecting(() => {});

    connection.onreconnected(() => {});

    return () => {
      signalRService.stopConnection();
    };
  }, []);

  const reconnectToSignalR = () => {
    setTimeout(() => {
      connectToSignalR();
    }, 5000);
  };

  const handleShowNotification = () => {
    setShow(!show);
  };

  const fetchNotification = async () => {
    const res = await getNotification(userInfo.id);
    const unreadNoti = res?.data?.results.filter((noti: Noti) => !noti.isRead);
    setUnreadNoti(unreadNoti.length);
    console.log("notificationres", res?.data?.results);
    setNotification(res?.data?.results as Noti[]);
  };

  useEffect(() => {
    fetchNotification();
  }, [newReceivedNotification]);

  const displayNoti = (noti: any) => {
    const newNoti: Noti = {
      notificationID: noti.notificationID,
      title: noti.title,
      description: noti.description,
      created: noti.created,
      isRead: noti.isRead,
      accountID: noti.accountID,
      notificationTypes: noti.notificationTypes,
      referenceId: noti.referenceId,
    };
    setNotification((prevNoti: Noti[]) => {
      const newNotiArray = [newNoti as Noti, ...prevNoti];
      const uniqueNoti = Array.from(
        new Set(newNotiArray.map((noti) => noti.notificationID))
      ).map((id) => newNotiArray.find((noti) => noti.notificationID === id));
      return uniqueNoti as Noti[];
    });
  };
  useEffect(() => {
    if (newReceivedNotification) {
      displayNoti(newReceivedNotification);
    }
  }, []);

  console.log("New notification:", notification);

  const handleDirectToDetail = async (noti: Noti) => {
    const currentUrl = window.location.href;
    const baseUrl = getDashboardBaseUrl(currentUrl);

    console.log("baseUrl", baseUrl);
    console.log("noti", noti.notificationTypes);
    // window.location.href = `${baseUrl}/request-manage?tab=property`;
    await markAsRead(noti.notificationID);
    fetchNotification();

    if (noti.notificationTypes === "Appointment") {
      window.location.href = `${baseUrl}/appointment-manage`;
    }
    if (noti.notificationTypes === "Deposit") {
      window.location.href = `${baseUrl}/request-manage?tab=deposit`;
    }
    if (noti.notificationTypes === "PropertyRequest") {
      window.location.href = `${baseUrl}/request-manage?tab=property`;
    }
    if (noti.notificationTypes === "RequestAppointment") {
      window.location.href = `${baseUrl}/request-manage`;
    }
    if (noti.notificationTypes === "Apartment") {
      window.location.href = `${baseUrl}/apartment-manage`;
    }
  };

  return (
    <div className="absolute z-50 right-0 top-0 mt-8 mr-2">
      <Popover>
        {/* NotificationComponent<></> */}

        {!isConnected && (
          <div className="relative right-0 top-0 m-5">
            <button className=" text-white rounded-lg bg-primary p-2">
              <span className="absolute right-0 top-0 bg-red-600 w-5 h-5 m-auto rounded-full text-white text-xs">
                {unreadNoti}
              </span>
              <Bell />
            </button>
          </div>
        )}
        {isConnected && (
          <div className="relative right-0 top-0 m-5">
            <PopoverTrigger asChild>
              <button
                onClick={handleShowNotification}
                className=" text-white rounded-lg bg-primary p-2"
              >
                <span className="absolute right-0 top-0 bg-red-600 w-5 h-5 m-auto rounded-full text-white text-xs">
                  {unreadNoti}
                </span>
                <Bell />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 m-r-2">
              <ScrollArea className="h-72 w-full  ">
                <h1 className="text-lg font-bold text-red-700">Thông báo</h1>
                <div className="flex flex-col mt-3">
                  {notification &&
                    notification?.map((noti) => (
                      <div
                        key={noti.notificationID}
                        className={`flex flex-col p-2 border-b cursor-pointer ${
                          !noti.isRead ? "bg-yellow-100" : ""
                        }`}
                        onClick={() => handleDirectToDetail(noti)}
                      >
                        <h1 className="text-lg font-bold">{noti.title}</h1>
                        <p>{noti.description}</p>
                      </div>
                    ))}
                </div>
                {notification.length === 0 && (
                  <>
                    <h1 className="text-lg font-bold">
                      Bạn chưa có thông báo nào
                    </h1>
                  </>
                )}
              </ScrollArea>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    markAsReadAll(userInfo.id);
                  }}
                  className="bg-primary text-white p-2 rounded-lg"
                >
                  Đánh dấu là đã đọc tất cả
                </button>
              </div>
            </PopoverContent>
          </div>
        )}
      </Popover>
    </div>
  );
};

export default NotificationComponent;
