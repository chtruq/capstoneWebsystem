"use client"
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { rejectRequestAppointment } from "@/app/actions/apointment";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { rejectRequestConsignment } from "@/app/actions/consignment";

interface Props {
  requestId: string;
  sellerId: string;
  typeRequest: string;
  onClose: () => void;
  isSubmitted: () => void;
}

const RejectRequestDialog: FC<Props> = ({ requestId, sellerId, typeRequest, onClose, isSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState("");
  const pathName = usePathname();

  // console.log("Pathname in reject:", pathName);

  // Danh sách lý do từ chối

  const reasonsList = (typeRequest: string) => {
    switch (typeRequest) {
      case "appointment":
        return [
          "Khách hàng thông báo không có nhu cầu đặt lịch tư vấn vào thời điểm hiện tại.",
          "Liên lạc với khách hàng không thành công sau nhiều lần thử.",
          "Khách hàng đã gửi một yêu cầu tương tự và đã được phản hồi.",
          "Khách hàng không còn nhu cầu đặt lịch nữa.",
          "Khác"
        ];
      case "consignment":
        return [
          "Khách hàng thông báo không có nhu cầu đặt lịch tư vấn vào thời điểm hiện tại.",
          "Liên lạc với khách hàng không thành công sau nhiều lần thử.",
          "Khách hàng đã gửi một yêu cầu tương tự và đã được phản hồi.",
          "Khách hàng chưa cung cấp đầy đủ thông tin cần thiết để tiến hành cuộc hẹn.",
          "Khách hàng không còn nhu cầu ký gửi căn hộ nữa.",
          "Khác"
        ];
      case "deposit":
        return [
          "Liên lạc với khách hàng không thành công sau nhiều lần thử.",
          "Khách hàng đã gửi một yêu cầu tương tự và đã được phản hồi.",
          "Khách hàng chưa cung cấp đầy đủ thông tin cần thiết để tiến hành cuộc hẹn.",
          "Khách hàng không còn nhu cầu đặt giữ chỗ căn hộ nữa.",
          "Khác"
        ];
      default:
        return [
          "Loại yêu cầu này chưa được hỗ trợ.",
          "Khác"
        ];
    }
  }

  // console.log("Request ID in reject:", requestId);
  // console.log("Seller ID in reject:", sellerId);
  // console.log("Type Request in reject:", typeRequest);


  const onSubmit = async () => {
    if (!reason) {
      alert("Vui lòng chọn lý do từ chối.");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("Reson in reject:", reason);
      if (typeRequest === "appointment") {
        await rejectRequestAppointment(requestId, sellerId, reason);
      } else if (typeRequest === "consignment") {
        await rejectRequestConsignment(requestId, sellerId, reason);
      } else if (typeRequest === "deposit") {
        // await rejectRequestDeposit(requestId, sellerId, reason);
      } else {
        return;
      }
      isSubmitted();
      revalidateProjectPath(pathName);
      // alert("Từ chối yêu cầu thành công!");
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog open={!!requestId} onOpenChange={onClose}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Từ chối</Button>
        </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lý do từ chối</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              {/* Dropdown chọn lý do */}
              <div className="mt-4">
                <label htmlFor="reason" className="font-medium">
                  Chọn lý do:
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-2 p-2 border rounded-md w-full"
                >
                  <option value="" disabled>
                    -- Chọn lý do --
                  </option>
                  {reasonsList(typeRequest).map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nút gửi */}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Xác nhận từ chối"}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RejectRequestDialog;
