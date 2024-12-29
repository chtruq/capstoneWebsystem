import { getProjectApartment, getProjectApartmentByProvider, getProjectApartmentByStaff } from "@/app/actions/project";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProjectTable from "@/components/project-manage/ProjectTable";
import SearchInput from "@/components/search/SearchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getUserInforFromCookie } from "@/app/actions/auth";
import { getProviderByAccountId } from "@/app/actions/provider";


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
      console.log("Data for manager", data);

    } else if (userToken?.role === "Project Provider") {
      console.log("Fetching data for project provider...");

      const providerId = await getProviderByAccountId({ accountId: userToken?.id });
      console.log("Provider ID", providerId[0].apartmentProjectProviderID);
      data = await getProjectApartmentByProvider({
        providerId: providerId[0].apartmentProjectProviderID,
        query,
        currentPage,
      });
      console.log("Data for provider", data);
    } else {
      console.log("Fetching data for other roles...");
      data = await getProjectApartmentByStaff({
        userId: userToken?.id,
        query,
        currentPage,
      });
      console.log("Data for staff", data);
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }

  console.log("aaaaaaaaaaaaa ", data?.totalPages);


  const totalPages = data?.totalPages;
  // const totalPages = 2;


  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý dự án</h1>
      <div className="w-[40%] mt-2">
        <SearchInput placeholder="Tìm kiếm dự án" query="projectName" />
      </div>
      <div>
        <ProjectTable data={data} />
      </div>
      <div className="">
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
