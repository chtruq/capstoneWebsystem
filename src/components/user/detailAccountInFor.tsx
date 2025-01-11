"use client"
import React, { FC } from "react";
import { formatRole } from "@/lib/utils/dataFormat";
import UpdatePasswordAccountDialog from "./updatePassword";

interface Props {
  dataAccount: User;
}

const DetailInFormationAccount: FC<Props> = ({ dataAccount }) => {
  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="w-[60%]">
          <div className="grid grid-cols-3 gap-4 gap-x-4">
            <p className="text-blur">Tên đăng nhập:</p>
            <p className="font-medium col-span-2">{dataAccount.name || "Chưa cập nhật"}</p>

            <p className="text-blur">Số điện thoại:</p>
            <p className="font-medium col-span-2">{dataAccount.phoneNumber || "Chưa cập nhật"}</p>

            <p className="text-blur">Chức vụ:</p>
            <p className="font-medium col-span-2">{formatRole(dataAccount.roles[0])}</p>

            <p className="text-blur">Địa chỉ mail:</p>
            <p className="font-medium col-span-2">{dataAccount.email}</p>

          </div>
        </div>
      </div>
      <div className="mt-4">
        <UpdatePasswordAccountDialog accountId={dataAccount.id} />
      </div>
    </div>

  );
};

export default DetailInFormationAccount;