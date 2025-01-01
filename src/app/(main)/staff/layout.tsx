import { getUserInforFromCookie } from "@/app/actions/auth";
import { getNotification } from "@/app/actions/notification";
import NotificationComponent from "@/components/noti/NotificationComponent";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";

async function StaffLayout({ children }: { children: React.ReactNode }) {
  const userInfo = await getUserInforFromCookie();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("Id:", userInfo?.id);
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-gray-100 p-3">
          <div className="flex justify-between z-50">
            <SidebarTrigger />
            {userInfo && (
              <NotificationComponent
                userInfo={userInfo}
                userToken={token?.value || ""}
              />
            )}
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

export default StaffLayout;
