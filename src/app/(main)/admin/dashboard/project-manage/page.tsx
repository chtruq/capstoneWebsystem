import { getProjectApartment } from "@/app/actions/project";
import PaginationComponent from "@/components/pagination/PaginationComponent";
// import ProjectTable from "@/components/project-manage/ProjectTable";
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
  const data = await getProjectApartment({
    query,
    currentPage,
  });
  const totalItem = data?.data?.data?.totalItem || 0;
  const totalPages = Math.ceil(totalItem / 10); // Calculate total pages

  return (
    <div className="">
      <h1 className="text-2xl font-semibold">Quản lý dự án</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="projectName" />
      </div>
      <div>
        {/* <ProjectTable query={query} currentPage={currentPage} /> */}
      </div>
      <div className="">
        {!totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default ProjectManage;
