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
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatMoneyShortcut, formatTextArea } from "@/lib/utils/dataFormat";
import { usePathname } from "next/navigation";
import { revalidateProjectPath } from "@/app/actions/revalidate";

interface Props {
  data: Apartment[];
  state: {
    state: string;
    currentPage: number;
  };
  role: string;
}

const statusType = (type: string) => {
  switch (type) {
    case "PendingApproval":
      return (
        <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center w-28">
          <p className="text-pending text-center">Chờ xác nhận</p>
        </div>
      );
    case "Done":
      return (
        <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center w-28">
          <p className="text-success">Thành công</p>
        </div>
      );
    case "Canceled":
      return (
        <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center w-28">
          <p className="text-failed text-center">Đã được hủy</p>
        </div>
      );
    default:
      return type;
  }
};

const ApartmentManageTable: FC<Props> = ({ data, state, role }) => {
  role = role.toString().toLowerCase();
  console.log("state ahuhu", state);
  console.log("User role from manage", role);
  if (role === "management") {
    role = "manager";
  }
  // console.log("User role from manage after", role);
  console.log("Data from manage table", data);
  const pathName = usePathname();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã căn hộ</TableHead>
            <TableHead className='font-semibold'>Hình ảnh</TableHead>
            <TableHead className='font-semibold'>Thuộc dự án</TableHead>
            <TableHead className="text-center font-semibold">Giá trị căn hộ</TableHead>
            <TableHead className="text-center font-semibold">Diện tích</TableHead>
            <TableHead className="text-center font-semibold">Phòng ngủ</TableHead>
            <TableHead className="text-center font-semibold">Nhà tắm</TableHead>
            <TableHead className="text-center font-semibold">Trạng thái</TableHead>
            <TableHead className="text-center font-semibold">Thao tác</TableHead>
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
                <TableCell>{apartment.projectApartmentName}</TableCell>
                <TableCell className="text-center">{formatMoneyShortcut(apartment.price)}</TableCell>
                <TableCell className="text-center">{formatTextArea(apartment.area)}</TableCell>
                <TableCell className="text-center">{apartment.numberOfRooms}</TableCell>
                <TableCell className="text-center">{apartment.numberOfBathrooms}</TableCell>
                <TableCell className="mt-[18px] flex items-center justify-center">
                  {statusType(apartment.apartmentStatus)}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/${role}/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
                        >
                          Xem chi tiết
                        </Link>
                      </DropdownMenuItem>
                      {state.state === "pending-request" ? (
                        <>
                          <DropdownMenuItem onClick={() => {
                            approveApartment({ id: apartment.apartmentID })
                            revalidateProjectPath(pathName)
                          }}>
                            Duyệt
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            rejectApartment({ id: apartment.apartmentID })
                            revalidateProjectPath(pathName)
                          }}>
                            Từ chối
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <></>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
