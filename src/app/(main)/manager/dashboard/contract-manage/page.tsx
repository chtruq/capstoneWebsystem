import ContractTable from "@/components/contract/contractTable/contractTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";

async function ContractManage(props: {
  searchParams?: Promise<{
    name?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.name || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 3;
  return (
    <div>
      <h1 className="font-semibold text-2xl">Hợp đồng</h1>
      <SearchInput placeholder="Tìm kiếm hợp đồng" query="name" />

      <div>
        <ContractTable
          // query={query}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default ContractManage;
