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
          <DialogDescription>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Mã giao dịch:</div>
                <div className="..."> {data.depositCode} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Mã ngân hàng:</div>
                <div className="..."> {data.transactionNo} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Mã căn hộ:</div>
                <div className="..."> {data.apartmentCode} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Khách hàng:</div>
                <div className="..."> {data.customerName} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Số tiền đặt cọc:</div>
                <div className="..."> {formatMoney(data.amountPaid)} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Ngày giao dịch:</div>
                <div className="..."> {formatDateTime(data.transactionDate)} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Phương thức thanh toán:</div>
                <div className="..."> {data.paymentMethods} </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="...">Trạng thái:</div>
                <div className="..."> {data.status} </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TransactionDetail;