import { getProjectApartment, getProjectApartmentByStaff } from "@/app/actions/project";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProjectTable from "@/components/project-manage/ProjectTable";
import SearchInput from "@/components/search/SearchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getUserInforFromCookie } from "@/app/actions/auth";


async function ProjectManage(props: {
  searchParams?: Promise<{
    projectName?: string;
    page?: string;
  }>;
}) {
  const userToken = await getUserInforFromCookie();
  console.log("User Tolken", userToken);
  console.log("User role", userToken?.role);
  console.log("User id", userToken?.id);
  const searchParams = await props.searchParams;
  const query = searchParams?.projectName || "";
  const currentPage = Number(searchParams?.page) || 1;
  let data;
  try {
    // Kiểm tra role để quyết định gọi hàm nào
    if (userToken?.role === "Management") {
      console.log("Fetching data for manager...");
      data = await getProjectApartment({
        query,
        currentPage,
      });
    } else {
      console.log("Fetching data for other roles...");
      data = await getProjectApartmentByStaff({
        userId: userToken?.id,
        query,
        currentPage,
      });
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }

  // console.log("aaaaaaaaaaaaa ",data?.totalPages);


  const totalPages = data?.totalPages;
  // const totalPages = 2;


  return (
    <div >
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
        <ProjectTable data={data} />
      </div>
      <div>
        {totalPages > 1 ? (
          <PaginationComponent totalPages={totalPages} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProjectManage;
