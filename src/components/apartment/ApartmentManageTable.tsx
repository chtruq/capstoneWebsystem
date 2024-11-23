"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import ApartmentTable from "./ApartmentTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import { getUserInfoFromCookies } from "@/app/actions/auth";
import { approveApartment, rejectApartment } from "@/app/actions/apartment";
import { usePathname, useRouter } from "next/navigation";


interface Props {
  data: Apartment[];
  state: string;
  role: string;
}


const ApartmentManageTable: FC<Props> = ({ data, state, role }) => {
  role = role.toString().toLowerCase();
  console.log("state ahuhu", state);
  console.log("User role from manage", role);
  if (role === "management") {
    role = "manager";
  }
  console.log("User role from manage after", role);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã căn hộ</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Diện tích</TableHead>
            <TableHead>Phòng ngủ</TableHead>
            <TableHead>Nhà tắm</TableHead>
            <TableHead>Thuộc dự án</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((apartment: Apartment) => (
            <TableRow key={apartment.apartmentID}>
              <TableCell>{apartment.apartmentCode}</TableCell>
              <TableCell>
                <Image
                  src={apartment?.images[0]?.imageUrl}
                  width={50}
                  height={50}
                  alt={apartment.apartmentName}
                  className="rounded-lg w-16 h-16"
                />
              </TableCell>
              <TableCell>{apartment.price}</TableCell>
              <TableCell>{apartment.area}</TableCell>
              <TableCell>{apartment.numberOfRooms}</TableCell>
              <TableCell>{apartment.numberOfBathrooms}</TableCell>
              <TableCell>{apartment.projectApartmentName}</TableCell>
              <TableCell>{apartment.apartmentStatus}</TableCell>
              <TableCell className="flex justify-center items-center">
                <Link
                  href={`/${role}/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
                >
                  <Button className="items-center" variant="outline" >
                    Xem chi tiết
                  </Button>
                </Link>
                {state === "pending-request" ? (
                  <>
                    <Button className="items-center" variant="outline" onClick={() => approveApartment({ id: apartment.apartmentID })}>
                      Duyệt
                    </Button>
                    <Button className="items-center" variant="outline" onClick={() => rejectApartment({ id: apartment.apartmentID })}>
                      Từ chối
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
};

export default ApartmentManageTable;
