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
import { Eye } from "lucide-react";
import { formatDateTime, formatDate } from "@/lib/utils/dataFormat";
import { Button } from "@/components/ui/button";
import { rejectRequestAppointment } from "@/app/actions/apointment";
import AddNewAppointmentDialog from "@/components/appointment/AddNewAppointmentDialog";
import RejectRequestDialog from "../RejectRequestDialog";
import { on } from "events";

interface Props {
  accountID: string;
  data: AppointmentRequest;
  isOpen: boolean;
  onClose: () => void;
}

const statusType = (type: string) => {
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

const DialogDetailAppointmentRequest: FC<Props> = ({ accountID, data, isOpen, onClose }) => {
  // const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi gọi API
  const [addAppointmentDialog, setAddAppointmentDialog] = useState(false)
  const [rejectRequestDialog, setRejectRequestDialog] = useState(false)
  // console.log("Data in Dialog Detail", data.requestID);
  // console.log("Data in Dialog Detail", data);
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  console.log("State isOpen in detail dialog", isDialogOpen);


  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogContent className="w-[24rem]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu tư vấn căn hộ</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Mã yêu cầu:</div>
                <div>{data.appointmentRequestCode || "Không có"}</div>

                <div className="font-semibold">Mã căn hộ:</div>
                <div>{data.apartmentCode}</div>

                <div className="font-semibold">Khách hàng:</div>
                <div>{data.username}</div>

                <div className="font-semibold">Số điện thoại:</div>
                <div>{data.phoneNumber}</div>

                <div className="font-semibold">Thời gian mong muốn:</div>
                <div>{formatDate(data.preferredDate)} {data.preferredTime || ""}</div>

                <div className="font-semibold">Trạng thái:</div>
                <div>{statusType(data.status)}</div>

                <div className="font-semibold">Ghi chú:</div>
                <div>{data.note}</div>

                <div className="font-semibold">Thời gian tạo:</div>
                <div>{formatDateTime(data.createDate)}</div>

                <div className="font-semibold">Thời gian cập nhật:</div>
                <div>{formatDateTime(data.updateDate)}</div>
              </div>
              {data?.status === "Pending" && (
                <>
                  <div className="mt-5 flex justify-center gap-10">
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

      {/* Hiển thị Dialog AddNewAppointment */}
      {addAppointmentDialog && (
        <AddNewAppointmentDialog
          ReferenceCode={data.appointmentRequestCode}
          CustomerID={data.customerID}
          ApartmentID={data.apartmentID}
          AssignedStaffAccountID={accountID}
          RequestID={data.requestID}
          onClose={() => {
            setAddAppointmentDialog(false)
          }}
          isSubmitted={() => {
            setAddAppointmentDialog(false)
            setIsDialogOpen(false)
            onClose()
          }}
        />
      )}

      {/* Hiển thị Dialog RejectRequest */}
      {rejectRequestDialog && (
        <RejectRequestDialog
          requestId={data.requestID}
          sellerId={accountID}
          typeRequest="appointment"
          onClose={() => {
            console.log("Closing dialogs...");
            setRejectRequestDialog(false)
          }}
          isSubmitted={() => {
            console.log("Closing dialogs...");
            setRejectRequestDialog(false)
            setIsDialogOpen(false)
            onClose()
          }}
        />
      )}

    </div>
  );
}

export default DialogDetailAppointmentRequest;