import React from "react";
import { UserAccountProvider } from "@/lib/context/UserAccountContext";
import { ToastContainer } from "react-toastify";
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserAccountProvider>{children}</UserAccountProvider>
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
