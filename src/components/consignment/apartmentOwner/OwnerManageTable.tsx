"use client";
import React, { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import { formatMoneyShortcut, formatDate } from "@/lib/utils/dataFormat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DialogDetailOwner from "./DialogDetailOwner";

interface Props {
  data: Owner[];
}

const tableType = (type: string) => {
  switch (type) {
    case "Female":
      return "Nữ";
    case "Male":
      return "Nam";
    case "Other":
      return "Khác";
  
    default:
      return type;
  }
};
const OwnerManageTable: FC<Props> = ({ data }: Props) => {
  const [selectedData, setSelectedData] = useState<Owner | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Quản lý trạng thái của dialog chi tiết

  console.log("Data in OwnerManageTable", data);
  const pathname = usePathname();
  console.log("Pathname", pathname);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Tên chủ căn hộ</TableCell>
            <TableCell className="font-semibold">Email</TableCell>
            <TableCell className="font-semibold text-center">Số điện thoại</TableCell>
            <TableCell className="font-semibold text-center">Giới tính</TableCell>
            <TableCell className="font-semibold text-center">Quốc tịch</TableCell>
            <TableCell className="font-semibold text-center">Thao tác</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((onwer: Owner) => (
              <TableRow key={onwer.apartmentOwnerID}>
                <TableCell>{onwer.name}</TableCell>
                <TableCell>{onwer.email}</TableCell>
                <TableCell className="text-center">{onwer.phoneNumber}</TableCell>
                <TableCell className="text-center">{tableType(onwer.gender)}</TableCell>
                <TableCell className="text-center">{onwer.nationality}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => { setSelectedData(onwer); setIsDetailDialogOpen(true) }}>
                        Chi tiết
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                        Cập nhật
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table >

      {/* Mở chi tiết Chủ căn hộ */}
      {selectedData && (
        <DialogDetailOwner
          data={selectedData}
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
        />
      )}

    </div >
  )
}

export default OwnerManageTable;