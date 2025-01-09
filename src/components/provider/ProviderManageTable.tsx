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
            <TableHead className="font-semibold">Nhà cung cấp</TableHead>
            <TableHead className="font-semibold">Người đại diện</TableHead>
            <TableHead className="font-semibold">Địa chỉ mail</TableHead>
            <TableHead className="font-semibold">Vị trí</TableHead>
            <TableHead className="font-semibold">Ngày tạo</TableHead>
            <TableHead className="font-semibold">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((provider: Provider) => (
              <TableRow key={provider.apartmentProjectProviderID}>
                <TableCell className="">{provider.apartmentProjectProviderName}</TableCell>
                <TableCell className="">{provider.name}</TableCell>
                <TableCell>{provider.email}</TableCell>
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
            ))
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table >
    </div >
  );
}

export default ProviderManageTable;