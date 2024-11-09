import BreadCrumb from "@/components/breadcrum/breadcrum";
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
      <BreadCrumb items={breadcrumbItems} />

      <div>HomePage</div>
    </div>
  );
}

export default HomePage;
