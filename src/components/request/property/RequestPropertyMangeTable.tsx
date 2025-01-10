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
import { formatMoneyShortcut } from '@/lib/utils/dataFormat';
import DialogDetailRequestProperty from './DialogDetailRequestProperty';
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { accepttRequestAppointment } from '@/app/actions/apointment';
import AddNewAppointmentDialog from '@/components/appointment/AddNewAppointmentDialog';
import { acceptRequestConsignment } from '@/app/actions/consignment';
import RejectRequestDialog from '../RejectRequestDialog';
interface Props {
  data: PropertyRequest[];
}

const tableType = (type: string) => {
  switch (type) {
    case "Pending":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-pending">Chờ duyệt</span>
        </div>
      );
    case "Accepted":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-success">Thành công</span>
        </div>
      );
    case "Rejected":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );

    default:
      return type;
  }
};

const RequestPropertyMangeTable: FC<Props> = ({ data }) => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<PropertyRequest | null>(null);
  const [isAddNewDialogOpen, setIsAddNewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  // console.log("Data in Request Property Manage Table", data);
  const { user } = useUserAccount();
  const pathName = usePathname();

  // console.log("User in Request Property Manage Table", user?.id);
  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã yêu cầu</TableHead>
            <TableHead className='font-semibold'>Khách hàng</TableHead>
            <TableHead className='font-semibold'>Địa chỉ mail</TableHead>
            <TableHead className='font-semibold text-center'>Số điện thoại</TableHead>
            <TableHead className='font-semibold text-center'>Giá mong muốn</TableHead>
            <TableHead className='font-semibold text-center'>Trạng thái</TableHead>
            <TableHead className='font-semibold text-center'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((item: PropertyRequest) => (
              <TableRow key={item?.requestID}>
                <TableCell>{item?.propertyRequestCode}</TableCell>
                <TableCell>{item?.userName}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell className='text-center'>{item?.phoneNumber}</TableCell>
                <TableCell className='text-center'>{formatMoneyShortcut(item?.expectedPrice)}</TableCell>
                <TableCell className='flex justify-center'>{tableType(item?.requestStatus)}</TableCell>
                <TableCell className='text-center'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='cursor-pointer align-middle'>
                      <DropdownMenuItem onClick={() => {
                        setSelectedData(item)
                        setIsDetailDialogOpen(true)
                      }}>
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        setSelectedData(item)
                        setIsAddNewDialogOpen(true)
                      }}>
                        Chấp nhận
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedData(item)
                        setIsRejectDialogOpen(true)
                      }}>
                        Từ chối
                      </DropdownMenuItem>
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

      {/* Dialog chi tiết yêu cầu ký gửi */}
      {isDetailDialogOpen && selectedData && (
        <DialogDetailRequestProperty
          accountID={user?.id || ""}
          data={selectedData}
          isOpen={isDetailDialogOpen}
          onClose={() => {
            setIsDetailDialogOpen(false)
            setSelectedData(null)
          }}
        />
      )}

      {/* Dialog chấp nhận và tạo lịch hẹn */}
      {isAddNewDialogOpen && selectedData && (
        <AddNewAppointmentDialog
          ReferenceCode={selectedData?.propertyRequestCode}
          CustomerID={selectedData?.ownerID}
          ApartmentID=""
          AssignedStaffAccountID={user?.id || ""}
          RequestID={selectedData?.requestID}
          Name={selectedData?.userName}
          Phone={selectedData?.phoneNumber}
          onClose={() => {
            console.log("Closing dialogs detail onClose...");
            setSelectedData(null)
            setIsAddNewDialogOpen(false)
          }}
          isSubmitted={async () => {
            console.log("Closing dialogs detail isSubmitted...");
            revalidateProjectPath(pathName);
            await acceptRequestConsignment(selectedData?.requestID, user?.id || "");
            setSelectedData(null)
            setIsAddNewDialogOpen(false)
          }}
        />
      )}

      {/* Dialog từ chối */}
      {isRejectDialogOpen && selectedData && (
        <RejectRequestDialog
          requestId={selectedData?.requestID}
          sellerId={user?.id || ""}
          typeRequest="request-consignment"
          onClose={() => {
            console.log("Closing dialogs in managetable...");
            setSelectedData(null)
            setIsRejectDialogOpen(false)
          }}
          isSubmitted={() => {
            console.log("Closing isSubmiit dialogs in manage table...");
            setSelectedData(null)
            setIsRejectDialogOpen(false)
          }}
        />
      )}

    </div>
  )
}

export default RequestPropertyMangeTable