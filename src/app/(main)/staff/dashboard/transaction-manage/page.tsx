import SearchInput from "@/components/search/SearchInput";
import TransactionTable from "@/components/transaction/transactionTable/TransactionTable";
import React from "react";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { getTransactionByPage } from "@/app/actions/transaction";

async function TransactionPage(props: {
  searchParams?: Promise<{
    transactionId?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.transactionId || "";
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getTransactionByPage({ query, currentPage });
  console.log("trans data: ", data);
  const totalPages = data?.data.totalPages;
  console.log(totalPages);


  return (
    <div>
      <h1 className="text-2xl font-semibold">Giao dịch</h1>
      <div>
        <SearchInput placeholder="Tìm kiếm mã giao dịch, mã căn hộ" query="transactionId" />
      </div>
      <div>
        <TransactionTable data={data?.data?.transactions} />
      </div>
      <div className="absolute bottom-0 right-0">
        {totalPages  > 1 && (
          <PaginationComponent totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}

export default TransactionPage;
