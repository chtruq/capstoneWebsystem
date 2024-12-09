import React from "react";
import SearchInput from "@/components/search/SearchInput";

function TeamManage() {
  return (
    <div className="h-screen relative w-full">
      <h1 className="text-2xl font-semibold">Quản lý nhóm</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="projectName" />
      </div>

    </div>
  );
}

export default TeamManage;
