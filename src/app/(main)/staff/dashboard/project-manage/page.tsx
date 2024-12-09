import { getProjectApartment, getProjectApartmentByStaff } from "@/app/actions/project";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProjectTable from "@/components/project-manage/ProjectTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";
import { getUserInfoFromCookies } from "@/app/actions/auth";


async function ProjectManage(props: {
  searchParams?: Promise<{
    projectName?: string;
    page?: string;
  }>;
}) {
  const userToken = await getUserInfoFromCookies();
  console.log("User Tolken", userToken);
  console.log("User role", userToken.role);
  console.log("User id", userToken.id);
  const searchParams = await props.searchParams;
  const query = searchParams?.projectName || "";
  const currentPage = Number(searchParams?.page) || 1;
  let data;
  try {
    // Kiểm tra role để quyết định gọi hàm nào
    if (userToken.role === "management") {
      console.log("Fetching data for manager...");
      data = await getProjectApartment({
        query,
        currentPage,
      });
    } else {
      console.log("Fetching data for other roles...");
      data = await getProjectApartmentByStaff({
        userId: userToken.id,
        query,
        currentPage,
      });
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }

  console.log(data?.totalPages);


  const totalPages = data?.totalPages;
  // const totalPages = 2;

  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý dự án</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="projectName" />
      </div>
      <div>
        <ProjectTable data={data} />
      </div>
      <div className=" bottom-0 right-0">
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
