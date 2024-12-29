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
import { formatMoneyShortcut, formatTextArea } from "@/lib/utils/dataFormat";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
            <TableHead className="font-semibold">Thuộc dự án</TableHead>
            <TableHead className="font-semibold text-center">Giá trị căn hộ</TableHead>
            <TableHead className="font-semibold text-center">Diện tích</TableHead>
            <TableHead className="font-semibold text-center">Phòng ngủ</TableHead>
            <TableHead className="font-semibold text-center">Nhà tắm</TableHead>
            <TableHead className="font-semibold text-center">Trạng thái</TableHead>
            <TableHead className="font-semibold text-center">Thao tác</TableHead>
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
                  className="rounded-md w-16 h-16"
                />
              </TableCell>
              <TableCell>{tableText(apartment.projectApartmentName)}</TableCell>
              <TableCell className="text-center">{formatMoneyShortcut(apartment.price)}</TableCell>
              <TableCell className="text-center">{formatTextArea(apartment.area)}</TableCell>
              <TableCell className="text-center">{tableText(apartment.numberOfRooms)}</TableCell>
              <TableCell className="text-center">{tableText(apartment.numberOfBathrooms)}</TableCell>
              <TableCell className="text-center">{tableType(apartment.apartmentStatus)}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                      <Ellipsis size={24}/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link
                        href={`${newPathname}/apartment-manage/${apartment.apartmentID}/detail`}
                      >
                        Xem chi tiết
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`${newPathname}/apartment-manage/${apartment.apartmentID}/detail`}
                      >
                        Sửa
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              {/* <TableCell className="gap-1 flex">
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
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectCartTable;
