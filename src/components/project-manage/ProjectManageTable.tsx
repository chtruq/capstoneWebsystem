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
import { tableText } from "@/lib/utils/project";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils/dataFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';


interface Props {
  data: Project[];
}

const ProjectManageTable: FC<Props> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  const tableType = (type: string) => {
    switch (type) {
      case "OnSale":
        return (
          <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center w-28">
            <p className="text-money text-center">Đã bàn giao</p>
          </div>
        );
      case "HandedOver":
        return (
          <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center w-28">
            <span className="text-success">Đang mở bán</span>
          </div>
        );
      // case "HandedOver":
      //   return (
      //     <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center">
      //       <span className="text-success">HandedOver</span>
      //     </div>
      //   );

      default:
        return type;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Mã dự án</TableHead>
            <TableHead className="font-semibold">Tên dự án</TableHead>
            <TableHead className="font-semibold">Nhà cung cấp</TableHead>
            <TableHead className="font-semibold">Nhóm quản lý</TableHead>
            <TableHead className="font-semibold text-center">Giỏ hàng</TableHead>
            <TableHead className="font-semibold text-center">Trạng thái</TableHead>
            <TableHead className="font-semibold text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((project: Project) => (
              <TableRow key={project.projectApartmentID}>
                <TableCell>{project.projectCode}</TableCell>
                <TableCell>{project.projectApartmentName}</TableCell>
                <TableCell>{project.apartmentProjectProviderName}</TableCell>
                <TableCell>{tableText(project.teamName)}</TableCell>
                <TableCell className="text-center">{project.totalApartments} căn hộ</TableCell>
                <TableCell className="flex items-center justify-center">
                  {tableType(project.projectType)}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(
                            `${pathname}/${project.projectApartmentID}/detail`
                          );
                        }}
                      >
                        Chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(
                            `${pathname}/${project.projectApartmentID}/edit`
                          );
                        }}
                      >
                        Sửa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
            )) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectManageTable;
