import { getUserInforFromCookie } from "@/app/actions/auth";
import { getUser } from "@/app/actions/user";
import UpdateAccountDialog from "@/components/user/updateAccountDialog";
import React from "react";

async function SettingPage() {
  const userToken = await getUserInforFromCookie();
  const dataAccount = await getUser(userToken?.id);
  console.log("dataAccount", dataAccount);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-2xl">Thông tin tài khoản</p>
        <UpdateAccountDialog data={dataAccount} />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="w-[40%]">
          <div className="grid grid-cols-2 gap-4 gap-x-4">
            <p className="text-blur">Tên đăng nhập:</p>
            <p className="font-medium">{dataAccount.name}</p>

            <p className="text-blur">Role:</p>
            <p className="font-medium">{dataAccount.roles}</p>

            <p className="text-blur">Số điện thoại:</p>
            <p className="font-medium">{dataAccount.phoneNumber}</p>

            <p className="text-blur">Địa chỉ mail:</p>
            <p className="font-medium">{dataAccount.email}</p>


          </div>
        </div>
      </div>

    </div>
  );
}

export default SettingPage;
