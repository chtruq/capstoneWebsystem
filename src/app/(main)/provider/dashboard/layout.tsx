import React from "react";

const ProviderDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 relative w-full bg-white rounded-lg">{children}</div>;
};

export default ProviderDashboardLayout;
