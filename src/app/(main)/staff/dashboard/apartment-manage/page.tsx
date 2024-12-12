import ApartmentTable from "@/components/apartment/ApartmentTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";

async function ApartmentManage(props: {
  searchParams?: Promise<{
    apartmentCode?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentCode || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 3;
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý căn hộ</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="apartmentCode" />
      </div>
      <div>
        <ApartmentTable query={query} currentPage={currentPage} state="list-apt" />
      </div>
    </div>
  );
}

export default ApartmentManage;
