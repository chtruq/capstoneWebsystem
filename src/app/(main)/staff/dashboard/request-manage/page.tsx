import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/search/SearchInput";
import RequestAppointmentTable from "@/components/request/appointment/RequestAppointmentTable";
import RequestPropertyTable from "@/components/request/property/RequestPropertyTable";
import RequestDepositTable from "@/components/request/deposit/RequestDepositTable";
import { getUserInforFromCookie } from "@/app/actions/auth";
import { getTeamByAccountId } from "@/app/actions/team";
import Link from "next/link";

async function RequestManage(props: {
  searchParams?: Promise<{
    keyword?: string;
    page?: string;
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.keyword || "";
  const currentPage = Number(searchParams?.page) || 1;
  const activeTab = searchParams?.tab || "appointment";

  const userToken = await getUserInforFromCookie();
  console.log("User Token from apartment table", userToken);
  const dataTeam = await getTeamByAccountId(userToken?.id);
  // console.log("Data team", dataTeam);
  // console.log("Data type", dataTeam.teamType);
  // console.log("Data team ID", dataTeam.teamID);
  // const totalPendingRequestsForAppointment = 2;
  // const totalPendingRequestsForDeposit = 2;
  // const totalPendingRequestsForProperty = 2;

  return (
    <>
      <h1 className="text-2xl font-semibold">Quản lý yêu cầu</h1>
      <div className="my-2">
        <SearchInput placeholder="Tìm kiếm mã yêu cầu, mã căn hộ" query="keyword" />
      </div>
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <Link href={`?tab=appointment`} scroll={false}>
            <TabsTrigger value="appointment">
              <div className="flex items-center gap-2">
                <h1 className="text-sm">Tư vấn căn hộ</h1>
                {/* <div className="text-xs text-white bg-yellow-500 rounded w-5 h-5 flex justify-center items-center">
                  {totalPendingRequestsForAppointment}
                </div> */}
              </div>
            </TabsTrigger>
          </Link>
          <Link href={`?tab=deposit`} scroll={false}>
            <TabsTrigger value="deposit">Đặt cọc giữ chỗ</TabsTrigger>
          </Link>
          {dataTeam?.teamType !== "ProjectManagement" ? (
            <Link href={`?tab=property`} scroll={false}>
              <TabsTrigger value="property">Yêu cầu ký gửi</TabsTrigger>
            </Link>
          ) : null}
        </TabsList>
        {/* <TabsTrigger value="property">Yêu cầu ký gửi</TabsTrigger> */}
        <TabsContent value="appointment">
          <RequestAppointmentTable
            query={query}
            currentPage={currentPage}
            teamID={dataTeam?.teamID}
          />
        </TabsContent>
        <TabsContent value="deposit">
          <RequestDepositTable
            query={query}
            currentPage={currentPage}
            teamID={dataTeam?.teamID}
          />
        </TabsContent>
        {dataTeam?.teamType !== "ProjectManagement" ? (
          <TabsContent value="property">
            <RequestPropertyTable
              query={query}
              currentPage={currentPage}
            />
          </TabsContent>
        ) : null}
        {/* <TabsContent value="property">
          <div>Ký gửi</div>
          <RequestPropertyTable />
        </TabsContent> */}
      </Tabs>
    </>
  );
}

export default RequestManage;
