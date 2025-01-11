import React from "react";
import SearchInput from "@/components/search/SearchInput";
import { getTeamByAccountId } from "@/app/actions/team";
import { getUserInforFromCookie } from "@/app/actions/auth";
import { getMemberByTeam } from "@/app/actions/teammembers";
import { tableText } from "@/lib/utils/project";
import TeamMemberTable from "@/components/team/teamMemberTable/TeamMemberTable";
import PaginationComponent from "@/components/pagination/PaginationComponent";

async function TeamManage(props: {
  searchParams?: Promise<{
    teamMemberName?: string;
    page?: string;
  }>;
}) {
  const userToken = await getUserInforFromCookie();
  console.log("User Tolken", userToken);
  console.log("User role", userToken?.role);
  console.log("User id", userToken?.id);
  const data = await getTeamByAccountId(userToken?.id);
  // console.log("Dataaaaaaa", data);
  if (!data || !data.teamID) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Không tìm thấy thông tin nhóm</h1>
      </div>
    );
  }
  const resolvedSearchParams = await props.searchParams;
  const query = resolvedSearchParams?.teamMemberName || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const teamMemberData = await getMemberByTeam(data.teamID, currentPage, query);

  // console.log("Team member data", teamMemberData);

  const totalPages = teamMemberData?.data.totalPages;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Chi tiết nhóm quản lý</h1>
      <h1 className="font-semibold">Tổng quan</h1>
      <div className="w-1/2">
        <div className="my-2 w-full">
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Mã nhóm</div>
            <div className="justify-start w-2/3">
              {tableText(data?.teamCode)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Tên nhóm</div>
            <div className="justify-start w-2/3">{data?.teamName}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Người quản lý</div>
            <div className="justify-start w-2/3">{data?.managerName}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Nhóm quản lý</div>
            <div className="justify-start w-2/3">
              {data?.teamType === "ProjectManagement"
                ? "Theo dự án"
                : "Ký gửi"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-blur text-sm w-1/3">Mô tả</div>
            <div className="justify-start w-2/3">{data?.teamDescription}</div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-semibold w-[20%] ">Danh sách thành viên</h1>
        <div className="w-[20%] my-2">
          <SearchInput
            placeholder="Tìm kiếm thành viên"
            query="teamMemberName"
          />
        </div>

        <TeamMemberTable data={teamMemberData?.data} />

        <div>
          {totalPages > 1 && (
            <PaginationComponent totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamManage;
