"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
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
import { approveApartment, rejectApartment } from "@/app/actions/apartment";


interface Props {
  data: Apartment[];
  state: {
    state: string;
    currentPage: number;
  };
  role: string;
}


const ApartmentManageTable: FC<Props> = ({ data, state, role }) => {
  role = role.toString().toLowerCase();
  console.log("state ahuhu", state);
  console.log("User role from manage", role);
  if (role === "management") {
    role = "manager";
  }
  // console.log("User role from manage after", role);
  console.log("Data from manage table", data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã căn hộ</TableHead>
            <TableHead className='font-semibold'>Hình ảnh</TableHead>
            <TableHead className="text-center font-semibold">Giá</TableHead>
            <TableHead className="text-center font-semibold">Diện tích</TableHead>
            <TableHead className="text-center font-semibold">Phòng ngủ</TableHead>
            <TableHead className="text-center font-semibold">Nhà tắm</TableHead>
            <TableHead className='font-semibold'>Thuộc dự án</TableHead>
            <TableHead className="text-center font-semibold">Trạng thái</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {data && data.length > 0 ? (
            data?.map((apartment: Apartment) => (
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
                <TableCell className="text-center">{apartment.price}</TableCell>
                <TableCell className="text-center">{apartment.area}</TableCell>
                <TableCell className="text-center">{apartment.numberOfRooms}</TableCell>
                <TableCell className="text-center">{apartment.numberOfBathrooms}</TableCell>
                <TableCell>{apartment.projectApartmentName}</TableCell>
                <TableCell className="text-center">{apartment.apartmentStatus}</TableCell>
                <TableCell className="items-center">
                  <Link
                    href={`/${role}/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
                  >
                    <Button className="items-center" variant="outline" >
                      Xem chi tiết
                    </Button>
                  </Link>
                  {state.state === "pending-request" ? (
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
              </TableRow> //sda
            ))
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </div >
  );
};

export default ApartmentManageTable;
