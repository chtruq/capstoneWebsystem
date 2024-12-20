import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/search/SearchInput";
import RequestAppointmentTable from "@/components/request/appointment/RequestAppointmentTable";
import RequestPropertyTable from "@/components/request/property/RequestPropertyTable";
import RequestDepositTable from "@/components/request/deposit/RequestDepositTable";
import { getUserInfoFromCookies } from "@/app/actions/auth";
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

  const userToken = await getUserInfoFromCookies();
  console.log("User Token from apartment table", userToken);
  const dataTeam = await getTeamByAccountId(userToken.id);
  // console.log("Data team", dataTeam);
  // console.log("Data type", dataTeam.teamType);
  // console.log("Data team ID", dataTeam.teamID);

  return (
    <>
      <h1 className="text-2xl font-semibold">Quản lý yêu cầu</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="keyword" />
      </div>
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <Link href={`?tab=appointment`} scroll={false}>
            <TabsTrigger value="appointment">Tư vấn căn hộ</TabsTrigger>
          </Link>
          <Link href={`?tab=deposit`} scroll={false}>
            <TabsTrigger value="deposit">Đặt cọc</TabsTrigger>
          </Link>
          {dataTeam.teamType !== "ProjectManagement" ? (
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
            teamID={dataTeam.teamID}
          />
        </TabsContent>
        <TabsContent value="deposit">
          <div>Đặt cọc</div>
          <RequestDepositTable
            query={query}
            currentPage={currentPage}
            teamID={dataTeam.teamID}
          />
        </TabsContent>
        {dataTeam.teamType !== "ProjectManagement" ? (
          <TabsContent value="property">
            <div>Ký gửi</div>
            <RequestPropertyTable />
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
