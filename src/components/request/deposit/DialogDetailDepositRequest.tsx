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
import { formatDateTime, formatDate } from "@/lib/utils/dataFormat";
import { Button } from "@/components/ui/button";
import AddNewAppointmentDialog from "@/components/appointment/AddNewAppointmentDialog";
import RejectRequestDialog from "../RejectRequestDialog";
import { accepttRequestAppointment } from "@/app/actions/apointment";

interface Props {
  accountID: string;
  data: Deposit;
  isOpen: boolean;
  onClose: () => void;
}

const depositType = (type: string) => {
  switch (type) {
    case "Trade":
      return (
        type = "Trao đổi"
      );
    case "Deposit":
      return (
        type = "Đặt cọc"
      );
    default:
      return type;
  }
};


const DialogDetailDepositRequest: FC<Props> = ({ accountID, data, isOpen, onClose }) => {
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu đặt giữ chỗ căn hộ</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              <div className="grid grid-cols-2 gap-2 items-start">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold col-span-2 underline underline-offset-1"> Thông tin yêu cầu đặt cọc giữ chỗ:</div>

                  <div className="font-semibold">Loại yêu cầu:</div>
                  <div className="font-normal">{depositType(data.depositType)}</div>

                  <div className="font-semibold">Mã yêu cầu:</div>
                  <div className="font-normal">{data.depositCode}</div>

                  <div className="font-semibold">Mã căn hộ:</div>
                  <div className="font-normal">{data.apartmentCode}</div>

                  {data?.depositType === "Trade" && (
                    <>
                      <div className="font-medium underline text-blur">Mã yêu cầu cũ:</div>
                      <div className="font-normal">{data.oldDepositCode}</div>

                      <div className="font-medium underline text-blur">Mã căn hộ cũ:</div>
                      <div className="font-normal">{data.oldApartmentCode}</div>

                      <div className="font-semibold">Phí dịch vụ:</div>
                      <div className="font-normal">{data.tradeFee}</div>

                    </>
                  )}

                  <div className="font-semibold">Số tiền thanh toán:</div>
                  <div className="font-normal">{data.paymentAmount}</div>

                  <div className="font-semibold">Trạng thái:</div>
                  <div className="font-normal">{data.depositStatus}</div>



                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold col-span-2 underline underline-offset-1"> Thông tin khách hàng:</div>

                  <div className="font-semibold">Tên khách hàng:</div>
                  <div className="font-normal">{data.depositProfile[0].fullName}</div>

                  <div className="font-semibold">Số điện thoại:</div>
                  <div className="font-normal">{data.depositProfile[0].phoneNumber}</div>

                  <div className="font-semibold">Địa chỉ mail:</div>
                  <div className="font-normal">{data.depositProfile[0].email}</div>

                  <div className="font-semibold">Số căn cước công dân:</div>
                  <div className="font-normal">{data.depositProfile[0].identityCardNumber}</div>

                  <div className="font-semibold">Ngày cấp phép:</div>
                  <div className="font-normal">{formatDate(data.depositProfile[0].dateOfIssue)}</div>

                  <div className="font-semibold">Quốc tịch:</div>
                  <div className="font-normal">{data.depositProfile[0].nationality}</div>

                  <div className="font-semibold">Ngày sinh:</div>
                  <div className="font-normal">{formatDate(data.depositProfile[0].dateOfBirth)}</div>



                </div>
              </div>

              {/* {data?.depositStatus === "pending" && (
                <> */}
              <div className="mt-2 flex justify-around">
                <Button onClick={() => setRejectRequestDialog(true)}>
                  Từ chối
                </Button>
                <Button onClick={() => setAddAppointmentDialog(true)}>
                  Chấp nhận
                </Button>
              </div>
              {/* </>
              )} */}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Hiển thị Dialog AddNewAppointment */}
      {addAppointmentDialog && (
        <AddNewAppointmentDialog
          ReferenceCode={data.depositCode}
          CustomerID={data.accountID}
          ApartmentID={data.apartmentID}
          AssignedStaffAccountID={accountID}
          RequestID={data.depositID}
          onClose={() => {
            console.log("Closing dialogs detail onClose...");
            setAddAppointmentDialog(false)
          }}
          isSubmitted={async () => {
            setAddAppointmentDialog(false)
            console.log("Closing dialogs detail isSubmit...");
            await accepttRequestAppointment(data.depositID, accountID);
            setIsDialogOpen(false)
            onClose()
          }}
        />
      )}

      {/* Hiển thị Dialog RejectRequest */}
      {rejectRequestDialog && (
        <RejectRequestDialog
          requestId={data.depositID}
          sellerId={accountID}
          typeRequest="appointment"
          onClose={() => {
            console.log("Closing dialogs...");
            setRejectRequestDialog(false)
          }}
          isSubmitted={() => {
            console.log("Closing dialogs in detail...");
            setRejectRequestDialog(false)
            setIsDialogOpen(false)
            onClose()
          }}
        />
      )}

    </div>
  );
}

export default DialogDetailDepositRequest;