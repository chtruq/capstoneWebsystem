import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-gray-100 p-3">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

export default ManagerLayout;
