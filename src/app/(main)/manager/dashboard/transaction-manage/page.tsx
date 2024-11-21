import SearchInput from "@/components/search/SearchInput";
import React from "react";

async function TransactionPage(props: {
  searchParams?: Promise<{
    apartmentName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentName || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 3;
  return (
    <div>
      <h1 className="text-2xl font-semibold">Giao dịch</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm mã giao dịch" query={query} />
      </div>
    </div>
  );
}

export default TransactionPage;
