"use clinet";

import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formatDateTime } from "@/lib/utils/dataFormat";

interface Props {
  appointmentId: string;
  data: Appointment;
  isOpen: boolean;
  onClose: () => void;
}

const statusType = (type: string) => {
  switch (type) {
    case "Confirmed":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-fit">
          <span className="text-pending">Đang tiến hành</span>
        </div>
      );
    case "Done":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-fit">
          <span className="text-success">Thành công</span>
        </div>
      );
    case "Canceled":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-fit">
          <span className="text-failed text-center">Đã được hủy</span>
        </div>
      );

    default:
      return type;
  }
};




const DialogDetailAppointment: FC<Props> = ({ appointmentId, data, isOpen, onClose }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  console.log("State isOpen", isDialogOpen);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center">Chi tiết cuộc hẹn</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold col-span-2 underline underline-offset-1"> Thông tin cuộc hẹn:</div>

                  <div className="font-semibold">Mã cuộc hẹn:</div>
                  <div className="font-normal">{data.appointmentCode || "Đang cập nhật"}</div>

                  <div className="font-semibold">Loại cuộc hiện:</div>
                  <div>{data.title || "Đang cập nhật"}</div>

                  <div className="font-semibold">Mã căn hộ:</div>
                  <div>{data.apartmentCode || "Đang cập nhật"}</div>

                  <div className="font-semibold">Thời gian diễn ra:</div>
                  <div>{formatDateTime(data.appointmentDate) || "Đang cập nhật"}</div>

                  <div className="font-semibold">Trạng thái:</div>
                  <div>{statusType(data.appointmentStatus) || "Đang cập nhật"}</div>

                  <div className="font-semibold">Thời gian cập nhật:</div>
                  {new Date(data.updatedDate) < new Date(data.appointmentDate)
                    ? "Đang cập nhật"
                    : formatDateTime(data.updatedDate)}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold col-span-2 underline underline-offset-1"> Thông tin khách hàng:</div>

                  <div className="font-semibold">Tên khách hàng:</div>
                  <div>{data.customerName || "Đang cập nhật"}</div>

                  <div className="font-semibold">Số điện thoại:</div>
                  <div>{data.customerPhone || "Đang cập nhật"}</div>

                  <div className="font-semibold col-span-2 underline underline-offset-1"> Thông tin nhân viên:</div>

                  <div className="font-semibold">Tên nhân viên:</div>
                  <div>{data.sellerName || "Đang cập nhật"}</div>

                  <div className="font-semibold">Số điện thoại:</div>
                  <div>{data.sellerPhone || "Đang cập nhật"}</div>

                  <div className="font-semibold underline underline-offset-1">Mã yêu cầu:</div>
                  <div>{data.referenceCode || "Đang cập nhật"}</div>

                </div>

                <div className="col-span-2">
                  <div className="font-semibold">Địa điểm:</div>
                  <div>{data.location || "Đang cập nhật"}</div>
                </div>

                <div className="col-span-2">
                  <div className="font-semibold">Ghi chú:</div>
                  <div>{data.description || "Đang cập nhật"}</div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default DialogDetailAppointment;