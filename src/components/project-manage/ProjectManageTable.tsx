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

interface Props {
  data: Project[];
}

const ProjectManageTable: FC<Props> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  const tableType = (type: string) => {
    switch (type) {
      case "UpcomingforSale":
        return (
          <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center">
            <p className="text-money text-center">Đã bàn giao</p>
          </div>
        );
      case "OnSale":
        return (
          <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center">
            <span className="text-success">Đang mở bán</span>
          </div>
        );

      default:
        return type;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Code</TableHead>
            <TableHead className="font-semibold">Tên dự án</TableHead>
            <TableHead className="font-semibold">Giỏ hàng</TableHead>
            <TableHead className="font-semibold">Nhóm quản lý</TableHead>
            <TableHead className="font-semibold">Địa chỉ</TableHead>
            <TableHead className="font-semibold">Trạng thái</TableHead>
            <TableHead className="font-semibold"> Chi tiết </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((project: Project) => (
            <TableRow key={project.projectApartmentID}>
              <TableCell>{project.projectCode}</TableCell>
              <TableCell>{project.projectApartmentName}</TableCell>
              <TableCell>{project.totalApartments} căn hộ</TableCell>
              <TableCell>{tableText(project.teamName)}</TableCell>
              <TableCell>{tableText(project.address)}</TableCell>
              <TableCell>
                {tableType(project.projectType)}
                </TableCell>
              <TableCell className="gap-1 flex">
                <Button
                  onClick={() => {
                    router.push(
                      `${pathname}/${project.projectApartmentID}/detail`
                    );
                  }}
                  variant="outline"
                >
                  Chi tiết
                </Button>
                <Button
                  onClick={() => {
                    router.push(
                      `${pathname}/${project.projectApartmentID}/edit`
                    );
                  }}
                  variant="outline"
                >
                  Sửa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectManageTable;
