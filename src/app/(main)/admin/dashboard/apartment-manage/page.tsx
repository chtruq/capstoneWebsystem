import { getApartmentsTest } from "@/app/actions/apartment";
// import ApartmentTable from "@/components/apartment/ApartmentTable";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
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
  const data = await getApartmentsTest({ query, currentPage });
  const totalItem = data?.data?.data?.totalItem || 0;

  const totalPages = Math.ceil(totalItem / 10); // Calculate total pages

  console.log("total", totalPages);
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý căn hộ</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="apartmentName" />
      </div>
      <div>
        {/* <ApartmentTable query={query} currentPage={currentPage} /> */}
      </div>
      <div className="absolute bottom-0 right-0">
        {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default ApartmentManage;
