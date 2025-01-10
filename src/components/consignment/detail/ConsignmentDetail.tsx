"use client";

import React, { FC } from "react";
import { formatMoney, formatDate } from "@/lib/utils/dataFormat";
import { FileDown } from "lucide-react";

interface Props {
  data: Consignment;
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
          <span className="text-success">Đã duyệt</span>
        </div>
      );
    case "Rejected":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );
    case "Expirated":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-pending">Đã hết hạn</span>
        </div>
      );
    case "Canceled":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );
    default:
      return type;
  }
};

const ConsignmentDetail: FC<Props> = ({ data }: Props) => {
  console.log("Data in consignment detaileeeee", data);

  return (
    <>
      <div className="w-full my-2">

        {/* Thông tin hợp đồng */}
        <h1 className="font-semibold mb-2 text-lg">Thông tin hợp đồng:</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full grid gap-3">
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Mã hợp đồng:</p>
              <p className="col-span-2">{data.contractCode}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Tên hợp đồng:</p>
              <p className="col-span-2">{data.verificationName}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Khách hàng:</p>
              <p className="col-span-2">{data.ownerName}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Số điện thoại:</p>
              <p className="col-span-2">{data.ownerPhoneNumber}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Địa chỉ mail:</p>
              <p className="col-span-2">{data.ownerEmail}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Ngày hiệu lực:</p>
              <p className="col-span-2">{formatDate(data.effectiveDate)}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Ngày hết hạn:</p>
              <p className="col-span-2">{formatDate(data.expiryDate)}</p>
            </div>
          </div>

          <div className="w-full grid gap-4">
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Căn hộ:</p>
              <p className="col-span-2">{data.hasApartment ? "Đã tạo" : "Chưa tạo"}</p>
            </div>
            <div className="grid grid-cols-3 items-center">
              <p className="col-span-1 text-blur">Trạng thái:</p>
              <p className="col-span-2">{tableType(data.verificationStatus)}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Giá trị hợp đồng:</p>
              <p className="col-span-2">{formatMoney(data.propertyValue)}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Tiền đặt cọc: </p>
              <p className="col-span-2">{formatMoney(data.depositValue)}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Tiền môi giới:</p>
              <p className="col-span-2">{formatMoney(data.brokerageFee)}</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Tỷ lệ tiền hoa hồng:</p>
              <p className="col-span-2">{data.commissionRate}%</p>
            </div>
            <div className="grid grid-cols-3">
              <p className="col-span-1 text-blur">Nhân viên xác nhận:</p>
              <p className="col-span-2">{data.assignedTeamMemberName}</p>
            </div>
          </div>
        </div>


        {/* File tài liêu */}
        <h1 className="font-semibold text-lg mt-4 mb-1">Tài liệu liên quan:</h1>
        {data?.legalDocuments?.length > 0 ? (
          <div className="grid grid-cols-1 divide-y divide-slate-600 w-[60%]">
            {data.legalDocuments.map((document: LegalDocument, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <p className="py-1">{document.fileName}</p>
                <FileDown className="h-5 w-5 cursor-pointer text-blur" onClick={() => window.open(document.fileUrl)} />
              </div>
            ))}
          </div>
        ) : (
          <p>Không có tài liệu liên quan</p>
        )
        }

      </div >
    </>
  )
}

export default ConsignmentDetail;