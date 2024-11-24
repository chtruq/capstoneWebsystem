import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableText } from "@/lib/utils/project";
import { Button } from "../../../../components/ui/button";
interface Props {
  data: Deposit[];
}

const DepositMangeTable: FC<Props> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Code</TableHead>
            <TableHead className="font-semibold">Mã căn hộ</TableHead>
            <TableHead className="font-semibold">Tên khách hàng</TableHead>
            <TableHead className="font-semibold">Số điện thoại</TableHead>
            <TableHead className="font-semibold">Số tiền đặc cọc</TableHead>
          </TableRow>
          <TableBody>
            {data?.map((data: Deposit) => (
              <TableRow key={data.depositID}>
                <TableCell>{data.depositID}</TableCell>
                <TableCell>{data.apartmentID}</TableCell>
                <TableCell>{data?.depositProfile[0]?.fullName}</TableCell>
                <TableCell>{data?.depositProfile[0]?.phoneNumber}</TableCell>
                <TableCell>{data.depositAmount}</TableCell>
                
              </TableRow>
            ))}

          </TableBody>
        </TableHeader>
      </Table>
    </div>
  )
}

export default DepositMangeTable;