import { getUserInforFromCookie } from "@/app/actions/auth";
import { getUser } from "@/app/actions/user";
import UpdateAccountDialog from "@/components/user/updateAccountDialog";
import React from "react";
import { formatRole } from "@/lib/utils/dataFormat";
import DetailInFormationAccount from "@/components/user/detailAccountInFor";

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
     
      <DetailInFormationAccount dataAccount={dataAccount} />

    </div>
  );
}

export default SettingPage;
