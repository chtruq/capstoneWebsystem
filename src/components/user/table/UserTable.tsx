import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  data: User[];
}

const UserTable: FC<Props> = ({ data }) => {
  const tableHeader = [
    "Tên",
    "Email",
    "Số điện thoại",
    "Trạng thái",
    "Vai trò",
    "Hành động",
  ];

  return (
    <div>
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
              <TableCell>{user.accountStatus}</TableCell>
              <TableCell>{user.roles.join(", ")}</TableCell>
              <TableCell className="gap-1 flex">
                <Button variant="outline">Sửa</Button>
                <Button variant="outline">Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
