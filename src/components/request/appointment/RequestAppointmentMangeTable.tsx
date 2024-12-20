"use client";

import React, { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import { useUserAccount } from '@/lib/context/UserAccountContext';

import { Button } from "../../ui/button";
import { formatDate } from '@/lib/utils/dataFormat';
import DialogDetailAppointment from './DialogDetailAppointment';

interface Props {
  data: Appointment[];
}

const tableType = (type: string) => {
  switch (type) {
    case "Pending":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-fit">
          <span className="text-pending">Chờ duyệt</span>
        </div>
      );
    case "Accepted":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-fit">
          <span className="text-success">Thành công</span>
        </div>
      );
    case "Rejected":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-fit">
          <p className="text-failed text-center">Từ chối</p>
        </div>
      );

    default:
      return type;
  }
};



const RequestAppointmentMangeTable: FC<Props> = ({ data }) => {
  console.log("Data in Manage Appoint Table", data);
  const [selectedData, setSelectedData] = useState<Appointment | null>(null);

  const { user } = useUserAccount();
  console.log("User in Manage Tableaa", user);


  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã yêu cầu</TableHead>
            <TableHead className='font-semibold'>Mã căn hộ</TableHead>
            <TableHead className='font-semibold'>Khách hàng</TableHead>
            <TableHead className='font-semibold'>Số điện thoại</TableHead>
            <TableHead className='font-semibold'>Khung giờ</TableHead>
            <TableHead className='font-semibold'>Trạng thái</TableHead>
            <TableHead className='font-semibold'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((item: Appointment) => (
              <TableRow key={item?.requestID}>
                <TableCell>{item?.appointmentRequestCode}</TableCell>
                <TableCell>{item?.apartmentCode}</TableCell>
                <TableCell>{item?.username}</TableCell>
                <TableCell>{item?.phoneNumber}</TableCell>
                <TableCell>{formatDate(item?.preferredDate)}</TableCell>
                <TableCell>{tableType(item?.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='cursor-pointer align-middle'>
                      {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem onClick={() => setSelectedData(item)} // Gán dữ liệu của từng item vào selectedData
                      >
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {/* <Button variant='default' className='mr-2'>Chấp nhận</Button> */}
                        Chấp nhận
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Từ chối
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Hiển thị PopupDetailAppointment */}
      {selectedData && (
        <DialogDetailAppointment
          data={selectedData}
          onClose={() => setSelectedData(null)} // Đóng popup
        />
      )}
    </div>
  )
}

export default RequestAppointmentMangeTable