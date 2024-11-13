"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import DialogAction from "@/components/dialog/DialogAction";
import { accountStatusOptions } from "@/lib/utils/account";

const UserManageTable = ({ data }: { data: User[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [lockAccount, setLockAccount] = React.useState(false);

  const handleLockAccount = async (id: string) => {
    // Lock account logic here
    try {
      console.log("Lock account with id: ", id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center w-full justify-end">
        <Button
          onClick={() => {
            router.push("/admin/dashboard/user-manage/create");
          }}
          variant="outline"
          className=""
        >
          Thêm tài khoản
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{accountStatusOptions(user.accountStatus)}</TableCell>
              <TableCell>{user.roles.join(", ")}</TableCell>
              <TableCell className="gap-1 flex">
                <Button
                  onClick={() => {
                    router.push(`${pathname}/${user.id}`);
                  }}
                  variant="outline"
                >
                  Sửa
                </Button>
                {user.accountStatus === "LOCKED" ? (
                  <DialogAction
                    btnTitle="Mở khoá"
                    title="Mở khoá tài khoản"
                    description="Bạn có muốn mở khoá tài khoản này?"
                    action={() => handleLockAccount(user.id)}
                    btnActionTitle="Mở khoá"
                    open={lockAccount}
                    setOpen={setLockAccount}
                  />
                ) : (
                  <DialogAction
                    btnTitle="Khoá"
                    title="Khoá tài khoản"
                    description="Bạn có chắc là muốn khoá tài khoản này?"
                    action={() => handleLockAccount(user.id)}
                    btnActionTitle="Khoá"
                    open={lockAccount}
                    setOpen={setLockAccount}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManageTable;
