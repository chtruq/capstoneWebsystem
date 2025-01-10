"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import { formatMoneyShortcut, formatDate } from "@/lib/utils/dataFormat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserAccount } from '@/lib/context/UserAccountContext';
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { acceptConsignment, rejectConsignment } from "@/app/actions/consignment";
import RejectRequestDialog from "../request/RejectRequestDialog";



interface Props {
  data: Consignment[];
}

const hasApartment = (type: boolean) => {
  switch (type) {
    case false:
      return (
        <p className="text-pending">Chưa tạo</p>
      );
    case true:
      return (
        <p className="text-success">Đã tạo</p>
      );
    default:
      return type;
  }
};

const tableType = (type: string) => {
  switch (type) {
    case "Pending":
      return (
        <div className="bg-pending-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-pending">Chờ duyệt</span>
        </div>
      );
    case "Accepted":
      return (
        <div className="bg-success-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-success">Đã duyệt</span>
        </div>
      );
    case "Rejected":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );
    case "Expirated":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-pending">Đã hết hạn</span>
        </div>
      );
    case "Canceled":
      return (
        <div className="bg-primary-foreground rounded-md py-1 px-2 flex items-center justify-center w-24">
          <span className="text-failed text-center">Từ chối</span>
        </div>
      );
    default:
      return type;
  }
};

const ConsignmentManageTable: FC<Props> = ({ data }) => {
  const pathname = usePathname();
  console.log("Pathname", pathname);
  const { user } = useUserAccount();
  console.log("Use r", user?.role);
  const [rejectDialog, setRejectDialog] = useState<Consignment | null>(null);


  // const pathnameForCreateApartmentOwner = pathname.split("/").slice(0, -1).join("/") + "/apartment-manage/create-for-owner";
  // console.log("Updated pathname:", pathnameForCreateApartmentOwner);

  // console.log("Data from consignment manage table", data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã chứng từ</TableHead>
            <TableHead className='font-semibold'>Tên chứng từ</TableHead>
            <TableHead className="font-semibold">Chủ sở hữu</TableHead>
            <TableHead className="text-center font-semibold">Giá trị căn hộ</TableHead>
            <TableHead className="text-center font-semibold">Hết hiệu lực</TableHead>
            <TableHead className="text-center font-semibold">Tạo căn hộ</TableHead>
            <TableHead className="text-center font-semibold">Trạng thái</TableHead>
            <TableHead className="text-center font-semibold">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((item: Consignment) => (
              <TableRow key={item.verificationID}>
                <TableCell>{item.contractCode}</TableCell>
                <TableCell className="w-[280px]">{item.verificationName}</TableCell>
                <TableCell>{item.ownerName}</TableCell>
                <TableCell className="text-center">{formatMoneyShortcut(item.propertyValue)}</TableCell>
                <TableCell className="text-center">{formatDate(item.expiryDate)}</TableCell>
                <TableCell className="text-center">{hasApartment(item.hasApartment)}</TableCell>
                <TableCell className="flex justify-center">{tableType(item.verificationStatus)}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='cursor-pointer align-middle'>
                      {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem>
                        <Link href={`${pathname}/${item.verificationID}/detail`}>
                          Xem chi tiết
                        </Link>
                      </DropdownMenuItem>
                      {item?.verificationStatus === "Pending" && user?.role === "Staff" && (
                        <>
                          <DropdownMenuItem onClick={async () => {
                            await acceptConsignment(item.verificationID);
                            revalidateProjectPath(pathname)
                          }}>
                            Phê duyệt
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={async () => {
                            // await rejectConsignment(item.verificationID);
                            // revalidateProjectPath(pathname)
                            setRejectDialog(item);
                          }}>
                            Từ chối
                          </DropdownMenuItem>
                        </>
                      )}
                      {item?.hasApartment === false && item?.verificationStatus === "Accepted" &&
                        (<DropdownMenuItem>
                          <Link href={`${pathname}/${item.verificationID}/create-apartment-for-owner`}>
                            Tạo căn hộ
                          </Link>
                        </DropdownMenuItem>
                        )}
                      <DropdownMenuItem>
                        {/* <Link href={`${pathname}/${item.verificationID}/edit`}> */}
                        Sửa
                        {/* </Link> */}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Hiển thị Popup từ chối */}
      {rejectDialog && (
        <RejectRequestDialog
          requestId={rejectDialog?.verificationID}
          sellerId={user?.id || ""}
          typeRequest="consignment"
          onClose={() => setRejectDialog(null)}
          isSubmitted={() => setRejectDialog(null)}
        />
      )}
    </div >
  )
};

export default ConsignmentManageTable;