import ApartmentTable from "@/components/apartment/ApartmentTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
async function ApartmentManage(props: {
  searchParams?: Promise<{
    apartmentCode?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentCode || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý căn hộ</h1>
      <div className="flex justify-between items-center">
        <div className="w-[40%] my-2">
          <SearchInput placeholder="Tìm kiếm căn hộ" query="apartmentCode" />
        </div>
        <Link
          className="w-1/4 flex justify-end"
          href={`/staff/dashboard/apartment-manage/pending`}
        >
          <Button>Danh sách chờ duyệt</Button>
        </Link>
      </div>
      <div>
        <ApartmentTable query={query} currentPage={currentPage} state="list-apt" />
      </div>
    </div>
  );
}

export default ApartmentManage;
