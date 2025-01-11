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
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
                <TableHead className="font-semibold">Mã nhóm</TableHead>
                <TableHead className="font-semibold">Tên nhóm</TableHead>
                <TableHead className="font-semibold">Trưởng nhóm</TableHead>
                <TableHead className="font-semibold text-center">Số nhân viên</TableHead>
                <TableHead className="font-semibold text-center">Đơn vị</TableHead>
                <TableHead className="font-semibold text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((team: Team) => (
                <TableRow key={team.teamID}>
                  <TableCell>{team.teamCode}</TableCell>
                  <TableCell>{team.teamName}</TableCell>
                  <TableCell>{team.managerName}</TableCell>
                  <TableCell className="text-center">{team.memberCount}</TableCell>
                  <TableCell className="text-center">
                    {team.teamType === "ProjectManagement"
                      ? "Theo dự án"
                      : "Ký gửi"}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis size={24} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link
                            href={`/manager/dashboard/team-manage/${team.teamID}`}
                          >
                            Xem chi tiết
                          </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                          Sửa
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
