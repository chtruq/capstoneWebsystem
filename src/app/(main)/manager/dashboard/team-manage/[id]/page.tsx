import { getMemberInTeamDetails, getTeamByTeamId } from "@/app/actions/team";
import { getMemberByTeam } from "@/app/actions/teammembers";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
import TeamMemberTable from "@/components/team/teamMemberTable/TeamMemberTable";
import { tableText } from "@/lib/utils/project";
import React from "react";

// const TeamDetails = async ({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams?: Promise<{
//     teamMemberName?: string;
//     page?: string;
//   }>;
// }) => {
async function TeamDetails({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Promise<{
    teamMemberName?: string;
    page?: string;
  }>;
}) {
  const data = await getTeamByTeamId(params.id);
  console.log("Dataaaaaaaaa", data);

  const teamData: Team = data?.data;
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.teamMemberName || "";

  // const query = resolvedSearchParams.teamMemberName || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  // const teamMemberData = await getMemberInTeamDetails(params.id, currentPage);

  const teamMemberData = await getMemberByTeam(params.id, currentPage, query);
  const totalPages = teamMemberData?.data.totalPages;

  // console.log("teamMemberData", teamMemberData?.data?.results);
  console.log("Total pages", totalPages);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Chi tiết nhóm quản lý</h1>
      <h1 className="font-semibold">Tổng quan</h1>
      <div className="w-1/2">
        <div className="my-2 w-full">
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Mã nhóm</div>
            <div className="justify-start w-2/3">
              {tableText(teamData?.teamCode)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Tên nhóm</div>
            <div className="justify-start w-2/3">{teamData?.teamName}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Người quản lý</div>
            <div className="justify-start w-2/3">{teamData?.managerName}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Nhóm quản lý</div>
            <div className="justify-start w-2/3">
              {teamData?.teamType === "ProjectManagement"
                ? "Theo dự án"
                : "Ký gửi"}
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="text-blur text-sm w-1/3">Mô tả</div>
          <div className="justify-start">{teamData?.teamDescription}</div>
        </div>
      </div>

      <div>
        <h1 className="font-semibold w-[20%] ">Danh sách thành viên</h1>
        <div className="w-[80%]">
          <SearchInput
            placeholder="Tìm kiếm thành viên"
            query="teamMemberName"
          />
        </div>

        <TeamMemberTable data={teamMemberData?.data} />

        <div>
          {totalPages > 1 && <PaginationComponent totalPages={totalPages} />}
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
