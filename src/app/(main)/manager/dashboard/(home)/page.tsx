import BreadCrumb from "@/components/breadcrum/breadcrum";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import React from "react";

function HomePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "More", dropdownItems: ["Documentation", "Themes", "GitHub"] },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumb" }, // Current page
  ];
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}

export default HomePage;
