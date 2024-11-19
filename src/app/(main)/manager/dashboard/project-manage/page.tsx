import { getProjectApartment } from "@/app/actions/project";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProjectTable from "@/components/project-manage/ProjectTable";
import SearchInput from "@/components/search/SearchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  // console.log(data?.totalPage);

  const totalPages = data?.totalPage;
  // const totalPages = 2;

  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý dự án</h1>
      <div className="flex">
        <SearchInput placeholder="Tìm kiếm dự án" query="projectName" />
        <div className="w-3/4 flex justify-end">
          <Button variant="default">
            <Link href="/manager/dashboard/project-manage/create">
              Tạo dự án
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <ProjectTable query={query} currentPage={currentPage} />
      </div>
      <div className="absolute bottom-0 right-0">
        {totalPages !== 1 ? (
          <PaginationComponent totalPages={totalPages} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProjectManage;
