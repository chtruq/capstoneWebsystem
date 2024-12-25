"use client";

import React, { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/dataFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import DialogDetailAppointment from "./DialogDetailAppointment";
import { set } from "zod";

interface Props {
  data: Appointment[];
}

const statusType = (type: string) => {
  switch (type) {
    case "Confirmed":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-28">
          <p className="text-pending">Đang tiến hành</p>
        </div>
      );
    case "Done":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-28">
          <p className="text-success">Thành công</p>
        </div>
      );
    case "Canceled":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-28">
          <p className="text-failed text-center">Đã được hủy</p>
        </div>
      );

    default:
      return type;
  }
};

const appoinmentType = (type: string) => {
  switch (type) {
    case "Appointment":
      return (
        type = "Tư vấn căn hộ"
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
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );

    default:
      return type;
  }
};

const AppointmentTable: FC<Props> = ({ data }) => {
  const [selectetDataDetail, setSelectetDataDetail] = useState<Appointment | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Quản lý trạng thái của dialog chi tiết



  console.log("Data in tableeee", data);


  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Mã lịch hẹn</TableHead>
            <TableHead className="font-semibold">Khách hàng</TableHead>
            <TableHead className="font-semibold">Số điện thoại</TableHead>
            <TableHead className="font-semibold">Thời gian hẹn</TableHead>
            <TableHead className="font-semibold">Kiểu lịch hẹn</TableHead>
            <TableHead className="font-semibold">Trạng thái</TableHead>
            {/* <TableHead className="font-semibold">Địa điểm</TableHead> */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((data: Appointment) => (
            <TableRow key={data.appointmentID}>
              <TableCell>{data.appointmentCode}</TableCell>
              <TableCell>{data.customerName}</TableCell>
              <TableCell>{data.customerPhone}</TableCell>
              <TableCell>{formatDateTime(data.appointmentDate)}</TableCell>
              <TableCell>{appoinmentType(data.appointmentTypes)}</TableCell>
              <TableCell>{statusType(data.appointmentStatus)}</TableCell>
              {/* <TableCell>{data.location}</TableCell> */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={24} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* <DropdownMenuLabel>Thao tác</DropdownMenuLabel> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setSelectetDataDetail(data)
                      setIsDetailDialogOpen(true)
                    }}>
                      Chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Hoàn thành
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Hủy
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Hiển thị Dialog Detail */}
      {selectetDataDetail && (
        <DialogDetailAppointment
          appointmentId={selectetDataDetail.appointmentID}
          data={selectetDataDetail}
          isOpen={true}
          onClose={() => {
            setSelectetDataDetail(null)
            setIsDetailDialogOpen(false)
          }}
        />
      )}

    </div>
  );
}

export default AppointmentTable;