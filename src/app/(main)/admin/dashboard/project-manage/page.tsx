import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProjectManageComponent from "@/components/project-manage/ProjectManageComponent";
import ProjectTable from "@/components/project-manage/ProjectTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";

async function ProjectManage(props: {
  searchParams?: Promise<{
    projectName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.projectName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 3;

  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý dự án</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="projectName" />
      </div>
      <div>
        <ProjectTable query={query} currentPage={currentPage} />
      </div>
      <div className="absolute bottom-0 right-0">
        {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default ProjectManage;
