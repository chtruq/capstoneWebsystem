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
import { formatDate } from "@/lib/utils/dataFormat";

interface Props {
  data: Provider[];
}

const ProviderManageTable: FC<Props> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Tên nhà cung cấp</TableHead>
            <TableHead className="font-semibold">Mô tả</TableHead>
            <TableHead className="font-semibold">Thông tin</TableHead>
            <TableHead className="font-semibold">Vị trí</TableHead>
            <TableHead className="font-semibold">Ngày tạo</TableHead>
            <TableHead className="font-semibold">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((provider: Provider) => (
            <TableRow key={provider.apartmentProjectProviderID}>
              <TableCell>{provider.apartmentProjectProviderName}</TableCell>
              <TableCell>{provider.apartmentProjectDescription}</TableCell>
              <TableCell>{provider.legallInfor}</TableCell>
              <TableCell>{provider.location}</TableCell>
              <TableCell>{formatDate(provider.createDate)}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push(`${pathname}/${provider.apartmentProjectProviderID}/detail`)
                  }
                >
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProviderManageTable;