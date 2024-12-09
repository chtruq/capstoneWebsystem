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
import { formatDateTime } from "@/lib/utils/dataFormat";

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
          <span className="text-success">Thành công</span>
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
            <TableHead>Mã giao dịch</TableHead>
            <TableHead>Mã căn hộ</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Ngày giao dịch</TableHead>
            <TableHead>Số tiền cọc</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((transaction: Transaction) => (
            <TableRow key={transaction.transactionId}>
              <TableCell>{transaction.depositCode}</TableCell>
              <TableCell>{transaction.apartmentCode}</TableCell>
              <TableCell>{transaction.customerName}</TableCell>
              <TableCell>{formatDateTime(transaction.transactionDate)}</TableCell>
              <TableCell>{transaction.amountPaid}</TableCell>
              <TableCell>{transaction.paymentMethods}</TableCell>
              <TableCell>{tableType(transaction.status)}</TableCell>
              <TableCell>
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
