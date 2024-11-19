import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  //   query: string;
  //   currentPage: number;
  data?: Team[];
}

const TeamTable: FC<Props> = async ({
  // query, currentPage,
  data,
}: Props) => {
  console.log(data);

  return (
    <div>
      <>
        {data ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã nhóm</TableHead>
                <TableHead>Tên nhóm</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Trưởng nhóm</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((team: Team) => (
                <TableRow key={team.teamID}>
                  <TableCell>{team.teamID}</TableCell>
                  <TableCell>{team.teamName}</TableCell>
                  <TableCell>{team.teamDescription}</TableCell>
                  <TableCell>{team.teamType}</TableCell>
                  <TableCell>{team.teamType}</TableCell>
                  <TableCell className="gap-1 flex">
                    <Link
                      href={`/manager/dashboard/team-manage/${team.teamID}`}
                    >
                      <Button variant="outline">Xem chi tiết</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default TeamTable;
