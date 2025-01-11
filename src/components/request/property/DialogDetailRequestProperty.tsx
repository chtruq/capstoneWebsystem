"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDateTime, formatDate, formatMoney } from "@/lib/utils/dataFormat";
import { Button } from "@/components/ui/button";
import AddNewAppointmentDialog from "@/components/appointment/AddNewAppointmentDialog";
import RejectRequestDialog from "../RejectRequestDialog";
import { acceptRequestConsignment } from "@/app/actions/consignment";

interface Props {
  accountID: string;
  data: PropertyRequest;
  isOpen: boolean;
  onClose: () => void;
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


const DialogDetailRequestProperty: FC<Props> = ({ accountID, data, isOpen, onClose }) => {
  const [addAppointmentDialog, setAddAppointmentDialog] = useState(false)
  const [rejectRequestDialog, setRejectRequestDialog] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogContent className="w-[28rem]">
          <DialogHeader>
            <DialogTitle> Chi tiết yêu cầu ký gửi </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold col-span-1">Mã yêu cầu:</div>
                <div className="col-span-2">{data.propertyRequestCode || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Tên tài sản:</div>
                <div className="col-span-2">{data.propertyName || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Khách hàng:</div>
                <div className="col-span-2">{data.userName || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Số điện thoại:</div>
                <div className="col-span-2">{data.phoneNumber || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Địa chỉ mail:</div>
                <div className="col-span-2">{data.email || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Giá mong muốn:</div>
                <div className="col-span-2">{formatMoney(data.expectedPrice) || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Trạng thái:</div>
                <div className="col-span-2">{tableType(data.requestStatus || "Đang cập nhật")}</div>

                <div className="font-semibold col-span-1">Địa chỉ:</div>
                <div className="col-span-2">{data.address || "Đang cập nhật"}</div>

                <div className="font-semibold col-span-1">Mô tả:</div>
                <div className="col-span-2"> {data.description || "Đang cập nhật"}</div>
              </div>

              {data?.requestStatus === "Pending" && (
                <>
                  <div className="mt-2 flex justify-around">
                    <Button onClick={() => setRejectRequestDialog(true)}>
                      Từ chối
                    </Button>
                    <Button onClick={() => setAddAppointmentDialog(true)}>
                      Chấp nhận
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Chấp nhận yêu cầu và hiển thị đặt lịch */}
      {addAppointmentDialog && (
        <AddNewAppointmentDialog
          ReferenceCode={data.propertyRequestCode}
          CustomerID={data.ownerID}
          ApartmentID=""
          AssignedStaffAccountID={accountID}
          RequestID={data.requestID}
          Name={data.userName}
          Phone={data.phoneNumber}
          onClose={() => {
            console.log("Closing dialogs detail onClose...");
            setAddAppointmentDialog(false)
          }}
          isSubmitted={async () => {
            console.log("Closing dialogs detail isSubmitted...");
            setIsDialogOpen(false)
            setAddAppointmentDialog(false)
            await acceptRequestConsignment(data.requestID, accountID);
            onClose()
          }}
        />
      )}

      {/* Từ chối yêu cầu */}
      {rejectRequestDialog && (
        <RejectRequestDialog
          requestId={data.requestID}
          sellerId={accountID}
          typeRequest="request-consignment"
          onClose={() => {
            console.log("Closing dialogs detail onClose...");
            setRejectRequestDialog(false);
          }}
          isSubmitted={() => {
            console.log("Closing dialogs detail isSubmitted...");
            setIsDialogOpen(false)
            setRejectRequestDialog(false)
            onClose()
          }}
        />
      )}



    </div>
  )
};

export default DialogDetailRequestProperty;