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
            <div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Mã giao dịch:</span>
                <span className="..."> {data.depositCode} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Mã ngân hàng:</span>
                <span className="..."> {data.transactionNo} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Mã căn hộ:</span>
                <span className="..."> {data.apartmentCode} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Khách hàng:</span>
                <span className="..."> {data.customerName} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Số tiền đặt cọc:</span>
                <span className="..."> {formatMoney(data.amountPaid)} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Ngày giao dịch:</span>
                <span className="..."> {formatDateTime(data.transactionDate)} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Phương thức thanh toán:</span>
                <span className="..."> {data.paymentMethods} </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="...">Trạng thái:</span>
                <span className="..."> {data.status} </span>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TransactionDetail;