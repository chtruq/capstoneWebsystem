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
import { Button } from "@/components/ui/button";
import { tableText, TextArea, TextPrice } from "@/lib/utils/project";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


interface Props {
  data: Apartment[];
  role: string;
}

const ProjectCartTable: FC<Props> = ({ data, role }) => {

  // console.log("aaaaaaaaaaaa");
  const pathname = usePathname();
  console.log("Original pathname:", pathname);

  const newPathname = pathname.split('/').slice(0, -3).join('/');

  console.log("Updated pathname:", newPathname);

  const tableType = (type: string) => {
    switch (type) {
      case "0":
        return (
          <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center">
            <p className="text-money text-center">Đang mở bán</p>
          </div>
        );
      case "2":
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
            <TableHead className="font-semibold">Mã căn hộ</TableHead>
            <TableHead className="font-semibold">Hình ảnh</TableHead>
            <TableHead className="font-semibold">Giá</TableHead>
            <TableHead className="font-semibold">Diện tích</TableHead>
            <TableHead className="font-semibold">Phòng ngủ</TableHead>
            <TableHead className="font-semibold">Nhà tắm</TableHead>
            <TableHead className="font-semibold">Dự án</TableHead>
            <TableHead className="font-semibold">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((apartment: Apartment) => (
            <TableRow key={apartment.apartmentID}>
              <TableCell>{tableText(apartment.apartmentCode)}</TableCell>
              <TableCell>
                <Image
                  src={apartment?.images?.[0]?.imageUrl || "/placeholder.png"}
                  width={70}
                  height={70}
                  alt="Ảnh"
                  className="rounded-md w-12 h-12"
                />
              </TableCell>
              <TableCell>{TextPrice(apartment.price)}</TableCell>
              <TableCell>{TextArea(apartment.area)}</TableCell>
              <TableCell>{tableText(apartment.numberOfRooms)}</TableCell>
              <TableCell>{tableText(apartment.numberOfBathrooms)}</TableCell>
              <TableCell>{tableText(apartment.projectApartmentName)}</TableCell>
              <TableCell>{tableType(apartment.apartmentStatus)}</TableCell>
              <TableCell className="gap-1 flex">
                {role === "Management" ? (
                  <Link
                    href={`${newPathname}/apartment-manage/${apartment.apartmentID}/detail`}
                  >
                    <Button className="items-center" variant="outline">
                      Xem chi tiết
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      href={`${newPathname}/apartment-manage/${apartment.apartmentID}/detail`}
                    >
                      <Button className="items-center" variant="outline">
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Button variant="outline">Sửa</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectCartTable;
