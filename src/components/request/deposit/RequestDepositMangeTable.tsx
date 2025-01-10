"use client"

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
import { Button } from "../../ui/button";
import { formatMoneyShortcut } from '@/lib/utils/dataFormat';
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { useUserAccount } from '@/lib/context/UserAccountContext';
import DialogDetailDepositRequest from './DialogDetailDepositRequest';
import AddNewAppointmentDialog from "@/components/appointment/AddNewAppointmentDialog";
import RejectRequestDialog from '../RejectRequestDialog';
import { approveDepositRequest } from '@/app/actions/deposit';

interface Props {
  data: Deposit[];
}

const tableType = (type: string) => {
  switch (type) {
    case "Pending":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-pending">Chờ duyệt</span>
        </div>
      );
    case "Accept":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-success">Thành công</span>
        </div>
      );
    case "Reject":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );
    case "Disable":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Hết hạn thanh toán</span>
        </div>
      );
    case "Paid":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-success">Đã thanh toán</span>
        </div>
      );
    case "RefundRequest":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-pending">Yêu cầu hoàn tiền</span>
        </div>
      );
    case "Refund":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-success">Đã hoàn tiền</span>
        </div>
      );
    default:
      return type;
  }
};




const RequestDepositMangeTable: FC<Props> = ({ data }) => {
  console.log("Data in Mange Table", data);
  const [selectedData, setSelectedData] = useState<Deposit | null>(null);
  const [rejectDialog, setRejectDialog] = useState<Deposit | null>(null);
  const [addAppointmentDialog, setAddAppointmentDialog] = useState<Deposit | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Quản lý trạng thái của dialog chi tiết
  const { user } = useUserAccount();
  const pathName = usePathname();

  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã yêu cầu</TableHead>
            <TableHead className='font-semibold'>Mã căn hộ</TableHead>
            <TableHead className='font-semibold'>Khách hàng</TableHead>
            <TableHead className='font-semibold text-center'>Số điện thoại</TableHead>
            <TableHead className='font-semibold text-center'>Giá giữ chỗ</TableHead>
            <TableHead className='font-semibold text-center'>Trạng thái</TableHead>
            <TableHead className='font-semibold text-center'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((item: Deposit) => (
              <TableRow key={item?.depositID}>
                <TableCell>{item?.depositCode}</TableCell>
                <TableCell>{item?.apartmentCode}</TableCell>
                <TableCell>{item?.depositProfile[0]?.fullName}</TableCell>
                <TableCell className='text-center'>{item?.depositProfile[0]?.phoneNumber}</TableCell>
                <TableCell className='text-center'>{formatMoneyShortcut(item?.depositAmount)}</TableCell>
                <TableCell className='flex justify-center'>{tableType(item?.depositStatus)}</TableCell>
                <TableCell className='text-center'>
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
                      }}>
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        await approveDepositRequest(item.depositID, user?.id || "");
                        revalidateProjectPath(pathName);
                      }}>
                        Chấp nhận ngay
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setAddAppointmentDialog(item)}>
                        Xác nhận
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRejectDialog(item)}>
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

      {/* Hiển thị Dialog Detail */}
      {isDetailDialogOpen && selectedData && (
        <DialogDetailDepositRequest
          accountID={user?.id || ""}
          data={selectedData}
          isOpen={isDetailDialogOpen}
          onClose={() => {
            console.log("Closing dialogs detail onClose...");
            setIsDetailDialogOpen(false)
          }}
        />
      )}

      {/* Hiển thị Popup từ chối */}
      {rejectDialog && (
        <RejectRequestDialog
          requestId={rejectDialog?.depositID}
          sellerId={user?.id || ""}
          typeRequest="deposit"
          onClose={() => {
            console.log("Closing dialogs in managetable...");
            setRejectDialog(null);
            setIsDetailDialogOpen(false);
          }} // Đóng popup
          isSubmitted={() => {
            console.log("Closing isSubmiit dialogs in manage table...");
            setRejectDialog(null)
            setIsDetailDialogOpen(false)
          }}
        />
      )}

      {/* Hiển thị Dialog AddNewAppointment */}
      {addAppointmentDialog && (
        <AddNewAppointmentDialog
          ReferenceCode={addAppointmentDialog.depositCode}
          CustomerID={addAppointmentDialog.accountID}
          ApartmentID={addAppointmentDialog.apartmentID}
          AssignedStaffAccountID={user?.id || ""}
          RequestID={addAppointmentDialog.depositID}
          Name={addAppointmentDialog.depositProfile[0].fullName}
          Phone={addAppointmentDialog.depositProfile[0].phoneNumber}
          onClose={() => {
            console.log("Closing onclose dialogs in manage table...");
            setAddAppointmentDialog(null)
            setIsDetailDialogOpen(false)
          }}
          isSubmitted={async () => {
            console.log("Closing isSubmiit dialogs in manage table...");
            setAddAppointmentDialog(null)
            setIsDetailDialogOpen(false)
            await approveDepositRequest(addAppointmentDialog.depositID, user?.id || "");
            revalidateProjectPath(pathName);
          }}
        />
      )}

    </div>
  )
}

export default RequestDepositMangeTable