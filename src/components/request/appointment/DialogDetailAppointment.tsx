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
import { formatDateTime, formatMoney } from "@/lib/utils/dataFormat";
import { Button } from "@/components/ui/button";
import { rejectRequestAppointment } from "@/app/actions/apointment";
import AddNewAppointmentDialog from "@/components/appointment/AddNewAppointmentDialog";

interface Props {
  data: Appointment;
  onClose: () => void;
}

const DialogDetailAppointment: FC<Props> = ({ data, onClose }) => {
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi gọi API


  console.log("Data in Dialog Detail", data.requestID);

  // Hàm từ chối yêu cầu tư vấn
  const handleRejectAppointment = async () => {
    try {
      if (!data?.requestID) return;

      // Hiển thị trạng thái loading
      setIsLoading(true);

      // Gọi API từ chối yêu cầu
      const response = await rejectRequestAppointment(data.requestID);

      // Kiểm tra phản hồi từ API
      if (response?.status === 'success') {
        alert('Từ chối yêu cầu thành công!'); // Thông báo thành công
        onClose(); // Đóng dialog
      } else {
        alert('Từ chối yêu cầu thất bại!'); // Thông báo lỗi nếu API không thành công
      }
    } catch (error) {
      console.error('Lỗi khi từ chối yêu cầu:', error);
      alert('Có lỗi xảy ra khi từ chối yêu cầu!');
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };
  console.log("Data in Dialog Detail", data);


  return (
    <div>
      <Dialog open={!!data} onOpenChange={onClose}>
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

                <div className="font-semibold">Thời gian :</div>
                <div>{formatDateTime(data.preferredDate)}</div>

                <div className="font-semibold">Thời gian tạo:</div>
                <div>{formatDateTime(data.createDate)}</div>

                <div className="font-semibold">Trạng thái:</div>
                <div>{data.status}</div>

              </div>
              <div className="mt-5 flex justify-center gap-10">
                <Button
                  variant="default"
                  onClick={handleRejectAppointment}
                  disabled={isLoading} // Không cho click khi đang gọi API
                >
                  {isLoading ? 'Đang từ chối...' : 'Từ chối'}
                </Button>
                <Button>
                  <AddNewAppointmentDialog ReferenceCode="" CustomerID="" ApartmentID="" AssignedStaffAccountID="" />
                  {/* Chấp nhận */}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogDetailAppointment;