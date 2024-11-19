import { getContract } from "@/app/actions/property";
import ContractTable from "@/components/contract/contractTable/contractTable";
import PaginationComponent from "@/components/pagination/PaginationComponent";
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
  const data = await getContract(query, currentPage);
  const totalPages = data?.totalPage || 1;

  return (
    <div>
      <h1 className="font-semibold text-2xl">Hợp đồng</h1>
      <SearchInput placeholder="Tìm kiếm hợp đồng" query="name" />

      <div>
        <ContractTable data={data?.contracts} />
      </div>
      <div>
        {totalPages > 1 && <PaginationComponent totalPages={totalPages} />}
      </div>
      
    </div>
  );
}

export default ContractManage;
