"use client"

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
import Link from "next/link";
import { approveDepositRequest, rejectDepositRequest } from "@/app/actions/deposit";
import { da } from "date-fns/locale";


interface Props {
  data: Deposit[];
  accountId: string;
}

const DepositMangeTable: FC<Props> = ({ data, accountId }) => {

  console.log("Data depositaâ", data);
  console.log("Accountaaa ID", accountId);
  
  
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
        </TableHeader>
        <TableBody>
          {data?.map((data: Deposit) => (
            <TableRow key={data.depositID}>
              <TableCell>{data.depositCode}</TableCell>
              <TableCell>{data.apartmentCode}</TableCell>
              <TableCell>{data?.depositProfile[0]?.fullName}</TableCell>
              <TableCell>{data?.depositProfile[0]?.phoneNumber}</TableCell>
              <TableCell>{data.depositAmount}</TableCell>
              <TableCell className="flex justify-center items-center">
                <Button className="items-center" variant="outline" onClick={() => approveDepositRequest({ depositRequestId: data.depositID, staffId: accountId })}>
                  Duyệt
                </Button>
                <Button className="items-center" variant="outline" onClick={() => rejectDepositRequest({ depositRequestId: data.depositID })}>
                  Từ chối
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </div>
  )
}

export default DepositMangeTable;