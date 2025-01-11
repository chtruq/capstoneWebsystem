import PaginationComponent from "@/components/pagination/PaginationComponent";
import ProviderTable from "@/components/provider/ProviderTable";
import SearchInput from "@/components/search/SearchInput";
import React from "react";
import { getProviders } from "@/app/actions/provider";
import AddNewProviderDialog from "@/components/provider/AddNewProviderDialog";


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
    console.log("abcaaa", data?.providers);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">Quản lý nhà cung cấp</h1>
      <div className="flex justify-between my-2">
        <div className="w-[40%]">
          <SearchInput placeholder="Tìm kiếm nhà cung cấp" query="providerName" />
        </div>
        <AddNewProviderDialog />
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
