import { getTeamsByPage } from "@/app/actions/team";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
import NewTeamDialog from "@/components/team/addNewTeamDialog";
import TeamTable from "@/components/team/teamTable/TeamTable";
import React from "react";

async function TeamManagePage(props: {
  searchParams?: Promise<{
    TeamName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.TeamName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getTeamsByPage({ query, currentPage });
  const totalPages = data?.data.totalPage;
  return (
    <div>
      <div className="h-screen">
        <h1 className="text-2xl font-semibold">Quản lý nhóm</h1>
        <div className="flex">
          <div className="w-full">
            <SearchInput placeholder="Tìm kiếm nhóm" query="TeamName" />
          </div>
          <NewTeamDialog />
        </div>
        <div></div>
        <div>
          <TeamTable
            data={data?.data?.teams}
            // query={query}
            // currentPage={currentPage}
          />
        </div>
        <div className="absolute bottom-0 right-0">
          {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default TeamManagePage;
