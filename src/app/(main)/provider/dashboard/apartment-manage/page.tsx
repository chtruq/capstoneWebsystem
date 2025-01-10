import { getApartmentsTest } from "@/app/actions/apartment";
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
    state?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getApartmentsTest({ query, currentPage });
  const totalPages = data?.data?.data?.totalPages;
  return (
    <div className="">
      <h1 className="text-2xl font-semibold">Quản lý căn hộ</h1>
      <div className="flex justify-between items-center">
        <div className="w-[40%] my-2">
          <SearchInput placeholder="Tìm kiếm theo mã căn hộ" query="apartmentName" />
        </div>
      </div>
      <div>
        <ApartmentTable query={query} currentPage={currentPage} state="list-apt" />
      </div>

      {/* <div className="absolute bottom-0 right-0">
        {totalPages > 1 ? (
          <PaginationComponent totalPages={totalPages} />
        ) : (
          <></>
        )}
      </div> */}
    </div>
  );
}

export default ApartmentManage;
