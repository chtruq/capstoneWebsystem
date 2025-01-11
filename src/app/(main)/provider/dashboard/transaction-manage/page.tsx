import SearchInput from "@/components/search/SearchInput";
import TransactionTable from "@/components/transaction/transactionTable/TransactionTable";
import React from "react";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { getTransactionByAccountId, getTransactionByPage } from "@/app/actions/transaction";
import { getUserInforFromCookie } from "@/app/actions/auth";

async function TransactionPage(props: {
  searchParams?: Promise<{
    transactionId?: string;
    page?: string;
  }>;
}) {
  const userToken = await getUserInforFromCookie();
  console.log("userTokensss", userToken);

  const searchParams = await props.searchParams;
  const query = searchParams?.transactionId || "";
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getTransactionByAccountId({ query, currentPage, accountId: userToken?.id });
  // console.log("trans data: ", data);
  const totalPages = data?.data?.totalPages;
  // console.log("Tolalpages",totalPages);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Giao dịch các căn hộ của bạn</h1>
      <div className="w-[40%] my-2">
        <SearchInput
          placeholder="Tìm kiếm mã giao dịch, mã căn hộ"
          query="transactionId"
        />
      </div>
      <div>
        <TransactionTable data={data?.data?.transactions} />
      </div>
      <div className="">
        {totalPages > 1 && <PaginationComponent totalPages={totalPages} />}
      </div>
    </div>
  );
}

export default TransactionPage;
