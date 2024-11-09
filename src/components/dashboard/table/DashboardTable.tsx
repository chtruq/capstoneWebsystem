import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableData {
  id: number;
  apartment: string;
  view: number;
  status: string;
  price: string;
}

interface DashboardTableProps {
  tableData: TableData[];
}

const DashboardTable: FC<DashboardTableProps> = ({ tableData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Căn hộ</TableHead>
          <TableHead>Lượt xem</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Giá</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.apartment}</TableCell>
            <TableCell>{item.view}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
