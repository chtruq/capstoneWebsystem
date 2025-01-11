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
import Image from "next/image";

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
            <TableHead className="font-semibold">Hình ảnh</TableHead>
            <TableHead className="font-semibold">Người đại diện</TableHead>
            <TableHead className="font-semibold">Địa chỉ mail</TableHead>
            {/* <TableHead className="font-semibold">Vị trí</TableHead> */}
            <TableHead className="font-semibold">Ngày tạo</TableHead>
            <TableHead className="font-semibold text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((provider: Provider) => (
              <TableRow key={provider.apartmentProjectProviderID}>
                <TableCell className="">{provider.apartmentProjectProviderName}</TableCell>
                <TableCell>
                  <Image
                    src={provider?.diagramUrl}
                    width={50}
                    height={50}
                    alt={provider.apartmentProjectProviderName}
                    className="rounded-full w-16 h-16"
                  />
                </TableCell>
                <TableCell className="">{provider.name}</TableCell>
                <TableCell>{provider.email}</TableCell>
                {/* <TableCell className="w-60">{provider.location}</TableCell> */}
                <TableCell>{formatDate(provider.createDate)}</TableCell>
                <TableCell className="text-center">
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