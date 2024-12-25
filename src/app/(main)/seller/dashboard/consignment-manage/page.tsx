import React from "react";
import SearchInput from "@/components/search/SearchInput";
import { getUserInforFromCookie } from "@/app/actions/auth";
import { getTeamByAccountId } from "@/app/actions/team";


async function ConsignmentMange(props: {
  searchParams?: Promise<{
    projectName?: string;
    page?: string;
  }>;
}) {
  const userToken = await getUserInforFromCookie();
  console.log("User Tolkeaaan", userToken);
  const teamData = await getTeamByAccountId(userToken?.id);
  console.log("Team Data", teamData);


  return (
    <div className="h-full">
      <h1 className="text-2xl font-semibold">Quản lý hợp đồng ký gửi</h1>
      {teamData?.teamType === "ProjectManagement" ? (
        <div className="mt-4 ml-2 text-xl underline underline-offset-1">Chức năng này không khả dụng với nhóm của bạn</div>
      ) : (
        <div className="h-screen">
          <div className="my-2 w-[30%]">
            <SearchInput placeholder="Tìm kiếm mã, tên hợp đồng, chủ sở hữu" query="apartmentCode" />
          </div>
          <div>
            {/* <ConsignmentTable query={query} currentPage={currentPage} state="list-apt" /> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default ConsignmentMange