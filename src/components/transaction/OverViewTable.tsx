import { getTransactionByPage } from "@/app/actions/transaction";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextPrice } from "@/lib/utils/project";
import PaginationComponent from "../pagination/PaginationComponent";
async function OverViewTable({ currentPage }: { currentPage: number }) {
  const data = await getTransactionByPage({ currentPage });
  console.log("data", data?.data);
  const totalPages = data?.data?.totalPages;

  return (
    <div>
      <div>
        <span className="text-blur text-sm">
          Hiển thị {data?.data?.transactions.length} trên{" "}
          {data?.data?.totalItems} giao dịch
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã giao dịch</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Mã căn hộ </TableHead>
            <TableHead>Ngày giao dịch</TableHead>
            <TableHead>Tiền đặt cọc</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.transactions?.map((item: Transaction) => (
            <TableRow key={item.transactionId}>
              <TableCell>{item.depositCode}</TableCell>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.apartmentCode}</TableCell>
              <TableCell>{item.transactionDate}</TableCell>
              <TableCell>{TextPrice(item.amountPaid)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        {totalPages > 1 && (
          <div>
            <PaginationComponent totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OverViewTable;
