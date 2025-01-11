import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
import UserTable from "@/components/user/table/UserTable";
import React from "react";

async function UserManage(props: {
  searchParams?: Promise<{
    email?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.email || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 4;
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-semibold">Quản lý tài khoản</h1>
      <div className="w-[40%] mt-2">
        <SearchInput placeholder="Tìm kiếm email" query="email" />
      </div>

      <div>
        <UserTable query={query} currentPage={currentPage} />
      </div>
      <div className="">
        {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default UserManage;
