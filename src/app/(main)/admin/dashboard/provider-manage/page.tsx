import { getProviders } from "@/app/actions/provider";
import PaginationComponent from "@/components/pagination/PaginationComponent";
// import ProviderTable from "@/components/provider/ProviderTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";

async function ProviderManage(props: {
  searchParams?: Promise<{
    providerName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.providerName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getProviders({ query, currentPage });
  const totalItem = data?.data?.data?.totalItem || 0;
  const totalPages = Math.ceil(totalItem / 10); // Calculate total pages
  return (
    <div>
      <h1 className="text-2xl font-semibold">Quản lý nhà cung cấp</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm nhà cung cấp" query="providerName" />
      </div>
      <div>
        {/* <ProviderTable query={query} currentPage={currentPage} /> */}
      </div>
      <div>
        {totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default ProviderManage;
