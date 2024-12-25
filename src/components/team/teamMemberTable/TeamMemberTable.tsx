import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableText } from "@/lib/utils/project";
interface Props {
  data: Team;
}

const TeamMemberTable: FC<Props> = ({ data }) => {
  console.log("Dataaaaa", data.results);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow >
            {/* <TableHead>Mã nhân viên</TableHead> */}
            <TableHead className="font-semibold">Tên nhân viên</TableHead>
            <TableHead className="font-semibold">Số liên hệ</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.results && data?.results.length > 0 ? (
            data.results.map((item: Member) => (
              <TableRow key={item?.teamMemberID}>
                <TableCell>{tableText(item?.name)}</TableCell>
                <TableCell>{tableText(item?.phoneNumber)}</TableCell>
                <TableCell>{tableText(item?.email)}</TableCell>
                {item?.isManager ? (
                  <TableCell>Quản lý</TableCell>
                ) : (
                  <TableCell>Thành viên</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamMemberTable;
