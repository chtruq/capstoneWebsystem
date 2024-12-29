"use client";

import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import TransactionDetail from "../transactionDetail/TransactionDetail";
import { formatDateTime, formatMoney } from "@/lib/utils/dataFormat";
interface Props {
  data: Transaction[];
}

const tableType = (type: string) => {
  switch (type) {
    case "Failed":
      return (
        <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center">
          <p className="text-failed text-center">Thất bại</p>
        </div>
      );
    case "Completed":
      return (
        <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center">
          <p className="text-success">Thành công</p>
        </div>
      );

    default:
      return type;
  }
};

const TransactionTable: FC<Props> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Mã giao dịch</TableHead>
            <TableHead className="font-semibold">Mã căn hộ</TableHead>
            <TableHead className="font-semibold">Khách hàng</TableHead>
            <TableHead className="font-semibold ">Số tiền giữ chỗ</TableHead>
            <TableHead className="font-semibold text-center">Ngày giao dịch</TableHead>
            <TableHead className="font-semibold text-center">Phương thức</TableHead>
            <TableHead className="font-semibold text-center">Trạng thái</TableHead>
            <TableHead className="font-semibold text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((transaction: Transaction) => (
            <TableRow key={transaction.transactionId}>
              <TableCell>{transaction.depositCode}</TableCell>
              <TableCell>{transaction.apartmentCode}</TableCell>
              <TableCell>{transaction.customerName}</TableCell>
              <TableCell className="">{formatMoney(transaction.amountPaid)}</TableCell>
              <TableCell className="text-center">{formatDateTime(transaction.transactionDate)}</TableCell>
              <TableCell className="text-center">{transaction.paymentMethods}</TableCell>
              <TableCell className="flex justify-center">{tableType(transaction.status)}</TableCell>
              <TableCell className="text-center">
                <TransactionDetail data={transaction} />
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
