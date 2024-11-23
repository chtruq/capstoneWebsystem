"use client";

import React, { FC, useEffect, useState } from "react";
import { getUserInfoFromCookies } from "@/app/actions/auth";

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

interface Props {
  data: Apartment[];
}

const ProjectCartTable: FC<Props> = ({ data }) => {
  const [userToken, setUserToken] = useState<{ role?: string } | null>(null);

  // Lấy thông tin user token
  useEffect(() => {
    const fetchUserToken = async () => {
      const token = await getUserInfoFromCookies();
      setUserToken(token);
    };

    fetchUserToken();
  }, []);

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
                {userToken?.role === "Management" ? (
                  <Link
                    href={`/manager/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
                  >
                    <Button className="items-center" variant="outline">
                      Xem chi tiết
                    </Button>
                  </Link>
                ) : userToken?.role === "Staff" ? (
                  <Link
                    href={`/staff/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
                  >
                    <Button className="items-center" variant="outline">
                      Xem chi tiết
                    </Button>
                  </Link>
                ) : null}
                <Button variant="outline">Sửa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectCartTable;
