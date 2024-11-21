import SearchInput from "@/components/search/SearchInput";
import OverViewTable from "@/components/transaction/OverViewTable";
import PayedTable from "@/components/transaction/PayedTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div>
      <h1 className="text-2xl font-semibold">Giao dịch</h1>

      <Tabs defaultValue="overview">
        <div className="flex w-full justify-between">
          <div className="w-1/4">
            <SearchInput placeholder="Tìm kiếm mã giao dịch" query={query} />
          </div>
          <div className="w-1/2">
            <TabsList className="bg-white h-full">
              <TabsTrigger className="h-full" value="overview">
                Tổng hợp
              </TabsTrigger>
              <TabsTrigger className="h-full" value="payed">
                Giải ngân
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-1/4 flex justify-end">
            <Button>Xuất file giao dịch</Button>
          </div>
        </div>
        <TabsContent value="overview">
          <div>
            <OverViewTable currentPage={currentPage} />
          </div>
        </TabsContent>
        <TabsContent value="payed">
          <PayedTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TransactionPage;
