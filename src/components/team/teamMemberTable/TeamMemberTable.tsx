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
  // console.log("Data", data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Mã nhân viên</TableHead> */}
            <TableHead>Tên nhân viên</TableHead>
            <TableHead>Số liên hệ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.results.map((item: Member) => (
            <TableRow key={item?.teamMemberID}>
              {/* <TableCell>{item?.}</TableCell> */}
              <TableCell>{tableText(item?.name)}</TableCell>
              <TableCell>{tableText(item?.phone)}</TableCell>
              <TableCell>{tableText(item?.email)}</TableCell>
              <TableCell>{item?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamMemberTable;
