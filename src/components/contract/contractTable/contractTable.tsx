import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: Contract[];
}

const ContractTable: FC<Props> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã hợp đồng</TableHead>
            <TableHead>Mã căn hộ</TableHead>

            <TableHead>Đối tác</TableHead>
            <TableHead>Ngày bắt đầu</TableHead>
            <TableHead>Ngày hết hạn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tải xuống</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((contract: Contract) => (
            <TableRow key={contract.contractCode}>
              <TableCell>{contract.contractCode}</TableCell>
              <TableCell>{contract.apartmentCode}</TableCell>
              <TableCell>{contract.ownerName}</TableCell>
              <TableCell>{contract.effectiveDate}</TableCell>
              <TableCell>{contract.expiryDate}</TableCell>
              <TableCell>{contract.verificationStatus}</TableCell>
              <TableCell>{contract.legalDocumentsURL}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </div>
  );
};

export default ContractTable;
