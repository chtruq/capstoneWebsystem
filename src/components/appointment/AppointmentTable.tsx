"use client";

import React, { FC, useEffect, useState } from "react";
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
import { acceptAppointment, rejectAppointment } from "@/app/actions/apointment";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { checkOwnerExist } from "@/app/actions/apartmentOwer";
import { set } from "date-fns";
import AddNewOwner from "../consignment/apartmentOwner/AddNewOwner";

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
    case "Property":
      return (
        type = "Tư vấn ký gửi"
      );
    case "Deposit":
      return (
        type = "Tư vấn đặt cọc"
      );

    default:
      return type;
  }
};

const AppointmentTable: FC<Props> = ({ data }) => {
  const [selectetDataDetail, setSelectetDataDetail] = useState<Appointment | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Quản lý trạng thái của dialog chi tiết
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accountID, setAccountID] = useState<string | null>(null);
  const pathName = usePathname();

  const handleCheckOwner = async (customerId: string) => {
    try {
      // console.log("Checking owner existence for customer ID:", customerId);
      const result = await checkOwnerExist(customerId);
      console.log("Owner existence result:", result);
      setIsOwner(result);
      if (result === false) {
        setIsLoading(true);
      }
    } catch (error) {
      console.error("Error checking owner existence:", error);
      alert("Error occurred while checking owner existence.");
    }
  };

  // Log `isOwner` when it changes
  useEffect(() => {
    console.log("isOwner changed:", isOwner);
    console.log("isLoading changed:", isLoading);


  }, [isOwner]);


  // console.log("Data in tableeee", data);
  // console.log("pathName in tableeee", pathName);


  return (

    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Mã lịch hẹn</TableHead>
            <TableHead className="font-semibold">Khách hàng</TableHead>
            <TableHead className="font-semibold text-center">Số điện thoại</TableHead>
            <TableHead className="font-semibold text-center">Thời gian hẹn</TableHead>
            <TableHead className="font-semibold text-center">Kiểu lịch hẹn</TableHead>
            <TableHead className="font-semibold text-center">Trạng thái</TableHead>
            <TableHead className="font-semibold text-center">Thao tác</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((data: Appointment) => (
              <TableRow key={data.appointmentID}>
                <TableCell>{data.appointmentCode}</TableCell>
                <TableCell>{data.customerName}</TableCell>
                <TableCell className="text-center">{data.customerPhone}</TableCell>
                <TableCell className="text-center">{formatDateTime(data.appointmentDate)}</TableCell>
                <TableCell className="text-center">{appoinmentType(data.appointmentTypes)}</TableCell>
                <TableCell className="flex justify-center">{statusType(data.appointmentStatus)}</TableCell>
                {/* <TableCell>{data.location}</TableCell> */}
                <TableCell className="text-center">
                  <DropdownMenu onOpenChange={() => {
                    setIsOwner(false)
                    setIsLoading(false)
                  }}>
                    <DropdownMenuTrigger onPointerDown={() => {
                      // console.log("Xác minh khách hàng")
                      handleCheckOwner(data.customerID)
                    }}>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* <DropdownMenuLabel>Thao tác</DropdownMenuLabel> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem onClick={() => {
                        setSelectetDataDetail(data)
                        setIsDetailDialogOpen(true)
                      }}>
                        Chi tiết
                      </DropdownMenuItem>
                      {isOwner === false && data.appointmentTypes === "Property" && isLoading ? (
                        <DropdownMenuItem onClick={() => setAccountID(data.customerID)}>
                          Tạo chủ nhân
                        </DropdownMenuItem>
                      ) : (
                        <></>
                      )}

                      {data.appointmentStatus === "Confirmed" ? (
                        <>
                          <DropdownMenuItem onClick={() => {
                            acceptAppointment(data.appointmentID)
                            revalidateProjectPath(pathName);
                          }}>
                            Hoàn thành
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            rejectAppointment(data.appointmentID)
                            revalidateProjectPath(pathName);
                          }}>
                            Hủy
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <></>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Hiển thị Dialog Detail */}
      {
        selectetDataDetail && (
          <DialogDetailAppointment
            data={selectetDataDetail}
            isOpen={isDetailDialogOpen}
            onClose={() => {
              setSelectetDataDetail(null)
              setIsDetailDialogOpen(false)
              revalidateProjectPath(pathName);
            }}
          />
        )
      }

      {/* Hiển thị Dialog tạo chủ nhân */}
      {accountID && (
        <AddNewOwner
          onClose={() => setAccountID(null)}
          AccountID={accountID}
        />
      )}

    </div >
  );
}

export default AppointmentTable;