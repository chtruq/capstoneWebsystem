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

interface Props {
  data: Owner;
  isOpen: boolean;
  onClose: () => void;
}

const DialogDetailOwner: FC<Props> = ({ data, isOpen, onClose }) => {


  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[28rem]">
          <DialogHeader>
            <DialogTitle>Chi tiết chủ căn hộ</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Tên chủ căn hộ:</div>
                <div>{data.name || "Đang cập nhật"}</div>

                <div className="font-semibold">Số điện thoại:</div>
                <div>{data.phoneNumber}</div>

                <div className="font-semibold">Địa chỉ mail:</div>
                <div>{data.email}</div>

                <div className="font-semibold">Số căn cước:</div>
                <div>{data.nationalID}</div>

                <div className="font-semibold">Ngày sinh:</div>
                <div>{formatDate(data.birthDate)}</div>

                <div className="font-semibold">Giới tính:</div>
                <div>{data.gender}</div>

                <div className="font-semibold">Quốc tịch:</div>
                <div>{data.nationality}</div>

                <div className="font-semibold">Ngày cấp:</div>
                <div>{formatDate(data.issueDate)}</div>

                <div className="font-semibold">Địa chỉ:</div>
                <div>{data.address}</div>

              </div>

            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
};

export default DialogDetailOwner;