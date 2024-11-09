import React, { FC } from "react";
import UserTable from "./table/UserTable";
import { Button } from "../ui/button";

interface Props {
  data: User[];
}

const AccountManage: FC<Props> = ({ data }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl">Quản lý nhân viên</h1>
      </div>
      <div className="flex justify-end">
        <Button variant="outline">Thêm nhân viên</Button>
      </div>
      <div>
        <UserTable data={data} />
      </div>
    </div>
  );
};

export default AccountManage;
