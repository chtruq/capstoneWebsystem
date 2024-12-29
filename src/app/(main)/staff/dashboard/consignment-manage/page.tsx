import React from "react";
import SearchInput from "@/components/search/SearchInput";
import { getUserInforFromCookie } from "@/app/actions/auth";
import { getTeamByAccountId } from "@/app/actions/team";
import ConsignmentTable from "@/components/consignment/ConsignmentTable";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OwnerTable from "@/components/consignment/apartmentOwner/OwnerTable";


async function ConsignmentMange(props: {
  searchParams?: Promise<{
    keyword?: string;
    page?: string;
  }>;
}) {
  const userToken = await getUserInforFromCookie();
  console.log("User Tolkeaaan", userToken);
  const teamData = await getTeamByAccountId(userToken?.id);
  console.log("Team Data", teamData);
  const searchParams = await props.searchParams;
  const query = searchParams?.keyword || "";
  const currentPage = Number(searchParams?.page) || 1;
  let role = userToken?.role.toLowerCase();
  console.log("Roleee", role);
  if (role === "Management") {
    role = "manager";
  }

  return (
    <div className="h-full">
      <h1 className="text-2xl font-semibold">Quản lý hợp đồng ký gửi</h1>
      {teamData?.teamType === "ProjectManagement" ? (
        <div className="mt-4 ml-2 text-xl underline underline-offset-1">Chức năng này không khả dụng với nhóm của bạn</div>
      ) : (
        <div className="h-screen">
          <div className="flex justify-between items-center">
            <div className="my-2 w-[30%]">
              <SearchInput placeholder="Tìm kiếm mã, tên hợp đồng, chủ sở hữu" query="keyword" />
            </div>
            <Link
              className="w-1/4 flex justify-end"
              href={`/${role}/dashboard/consignment-manage/create`}
            >
              <button className="bg-primary-foreground text-primary-foreground text-sm shadow hover:bg-primary/90 h-9 px-4 py-2">Tạo hợp đồng</button>
            </Link>
          </div>

          <Tabs defaultValue="consignment">
            <TabsList>
              <Link href={`?tab=consignment`} scroll={false}>
                <TabsTrigger value="consignment">Hợp đồng ký gửi</TabsTrigger>
              </Link>
              <Link href={`?tab=consignment-owner`} scroll={false}>
                <TabsTrigger value="consignment-owner">Khách hàng hợp tác</TabsTrigger>
              </Link>
            </TabsList>
            <TabsContent value="consignment">
              <ConsignmentTable query={query} currentPage={currentPage} />
            </TabsContent>
            <TabsContent value="consignment-owner">
              <OwnerTable query={query} currentPage={currentPage} />
            </TabsContent>
          </Tabs>

          {/* <div>
            <ConsignmentTable query={query} currentPage={currentPage} />
          </div> */}
        </div>
      )}
    </div>
  )
}

export default ConsignmentMange