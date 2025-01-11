import { getUsers } from "@/app/actions/user";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
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
    <div className="">
      <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm người dùng" query="apartmentName" />
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
