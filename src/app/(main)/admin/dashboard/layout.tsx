import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 relative w-full">{children}</div>;
};

export default DashboardLayout;
