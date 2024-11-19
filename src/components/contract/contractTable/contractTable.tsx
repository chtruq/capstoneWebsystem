import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const ContractTable = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã hợp đồng</TableHead>
            <TableHead>Mã Căn hộ</TableHead>
            <TableHead>Đối tác</TableHead>
            <TableHead>Ngày bắt đầu</TableHead>
            <TableHead>Ngày hết hạn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tải xuống</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ContractTable;
