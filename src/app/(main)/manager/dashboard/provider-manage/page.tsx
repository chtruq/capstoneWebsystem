import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProviderTable from "@/components/provider/ProviderTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";
import { getProviders } from "@/app/actions/provider";


async function ProviderManage(props: {
  searchParams?: Promise<{
    providerName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.providerName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 3;
  let data;
  try {
    data = await getProviders({ query, currentPage });
    console.log("abcaaa",data?.providers);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">Quản lý nhà cung cấp</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm nhà cung cấp" query="providerName" />
      </div>
      <div>
        <ProviderTable data={data.providers} />
      </div>
      <div>
        {!totalPages ? <PaginationComponent totalPages={totalPages} /> : <></>}
      </div>
    </div>
  );
}

export default ProviderManage;
