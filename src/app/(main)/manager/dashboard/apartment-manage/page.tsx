import ApartmentTable from "@/components/apartment/ApartmentTable";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function ApartmentManage(props: {
  searchParams?: Promise<{
    apartmentName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 3;
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý căn hộ</h1>
      <div className="flex">
        <div className="w-3/4">
          <SearchInput placeholder="Tìm kiếm căn hộ" query="apartmentName" />
        </div>
        <Link
          className="w-1/4 flex justify-end"
          href={`/manager/dashboard/apartment-manage/pending`}
        >
          <Button>Danh sách chờ duyệt</Button>
        </Link>
      </div>
      <div>
        <ApartmentTable query={query} currentPage={currentPage} />
      </div>
      <div className="absolute bottom-0 right-0">
        {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default ApartmentManage;
