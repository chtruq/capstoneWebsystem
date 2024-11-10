import { getUsers } from "@/app/actions/user";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
import AccountManage from "@/components/user/AccountManage";
import UserTable from "@/components/user/table/UserTable";
import React from "react";

async function UserManage(props: {
  searchParams?: Promise<{
    apartmentName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 4;
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý căn hộ</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm căn hộ" query="apartmentName" />
      </div>
      <div>
        <UserTable query={query} currentPage={currentPage} />
      </div>
      <div className="absolute bottom-0 right-0">
        {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default UserManage;
