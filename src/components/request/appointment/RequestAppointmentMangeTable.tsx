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
import DialogDetailAppointmentRequest from './DialogDetailAppointmentRequest';
import AddNewAppointmentDialog from "@/components/appointment/AddNewAppointmentDialog";
import RejectRequestDialog from '../RejectRequestDialog';

interface Props {
  data: AppointmentRequest[];
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
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );

    default:
      return type;
  }
};



const RequestAppointmentMangeTable: FC<Props> = ({ data }) => {
  const [selectedData, setSelectedData] = useState<AppointmentRequest | null>(null);
  const [rejectDialog, setRejectDialog] = useState<AppointmentRequest | null>(null);
  const [addAppointmentDialog, setAddAppointmentDialog] = useState<AppointmentRequest | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Quản lý trạng thái của dialog chi tiết
  const { user } = useUserAccount();
  // console.log("User in Manage Tableaa", user);

  // console.log("Data in Manage Appoint Table", data);
  console.log("State isDetailDialogOpen in RequestManageTable", isDetailDialogOpen);


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
            data?.map((item: AppointmentRequest) => (
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
                      <DropdownMenuItem onClick={() => {
                        setSelectedData(item)
                        setIsDetailDialogOpen(true)
                      }} // Gán dữ liệu của từng item vào selectedData
                      >
                        Xem chi tiết
                      </DropdownMenuItem>
                      {item?.status === "Pending" && (
                        <>
                          <DropdownMenuItem onClick={() => setAddAppointmentDialog(item)}>
                            Chấp nhận
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRejectDialog(item)}>
                            Từ chối
                          </DropdownMenuItem>
                        </>
                      )}
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
      {isDetailDialogOpen && selectedData && (
        <DialogDetailAppointmentRequest
          accountID={user?.id || ""}
          data={selectedData}
          isOpen={isDetailDialogOpen} // Trạng thái mở/đóng của dialog chi tiết
          onClose={() => {
            console.log("Closing dialogs...");
            setSelectedData(null)
            setIsDetailDialogOpen(false)
          }} // Đóng popup
        />
      )}

      {/* Hiển thị Popup từ chối */}
      {rejectDialog && (
        <RejectRequestDialog
          requestId={rejectDialog?.requestID}
          sellerId={user?.id || ""}
          typeRequest="appointment"
          onClose={() => {
            console.log("Closing dialogs...");
            setRejectDialog(null);
            setIsDetailDialogOpen(false);
          }} // Đóng popup
          isSubmitted={() => {
            setRejectDialog(null)
            setIsDetailDialogOpen(false)
          }}
        />
      )}

      {/* Hiển thị Dialog AddNewAppointment */}
      {addAppointmentDialog && (
        <AddNewAppointmentDialog
          ReferenceCode={addAppointmentDialog.appointmentRequestCode}
          CustomerID={addAppointmentDialog.customerID}
          ApartmentID={addAppointmentDialog.apartmentID}
          AssignedStaffAccountID={user?.id || ""}
          RequestID={addAppointmentDialog.requestID}
          onClose={() => {
            setAddAppointmentDialog(null)
            setIsDetailDialogOpen(false)
          }}
          isSubmitted={() => {
            setAddAppointmentDialog(null)
            setIsDetailDialogOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default RequestAppointmentMangeTable