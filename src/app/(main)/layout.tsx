import React from "react";
import { UserAccountProvider } from "@/lib/context/UserAccountContext";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserAccountProvider>{children}</UserAccountProvider>
    </div>
  );
}

export default MainLayout;
