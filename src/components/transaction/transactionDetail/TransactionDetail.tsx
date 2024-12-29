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


interface Props {
  data: Transaction;
}

const tableType = (type: string) => {
  switch (type) {
    case "Failed":
      return (
        <p className="text-failed text-center">Thất bại</p>
      );
    case "Completed":
      return (
        <p className="text-success">Thành công</p>
      );

    default:
      return type;
  }
};

const TransactionDetail: FC<Props> = ({ data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <Eye />
        </DialogTrigger>
        <DialogContent className="w-[24rem]">
          <DialogHeader>
            <DialogTitle>Chi tiết giao dịch</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Mã giao dịch:</span>
                <span className="..."> {data.depositCode} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Mã ngân hàng:</span>
                <span className="..."> {data.transactionNo} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Mã căn hộ:</span>
                <span className="..."> {data.apartmentCode} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Khách hàng:</span>
                <span className="..."> {data.customerName} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Số tiền đặt cọc:</span>
                <span className="..."> {formatMoney(data.amountPaid)} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Ngày giao dịch:</span>
                <span className="..."> {formatDateTime(data.transactionDate)} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Phương thức:</span>
                <span className="..."> {data.paymentMethods} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold ...">Trạng thái:</span>
                <span className="..."> {tableType(data.status)} </span>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TransactionDetail;