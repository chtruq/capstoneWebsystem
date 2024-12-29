import React, { FC } from 'react'
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

import { Button } from "../../ui/button";
import { formatMoneyShortcut } from '@/lib/utils/dataFormat';

interface Props {
  data: Deposit[];
}

const RequestDepositMangeTable: FC<Props> = ({ data }) => {
  console.log("Data in Mange Table", data);

  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã yêu cầu</TableHead>
            <TableHead className='font-semibold'>Mã căn hộ</TableHead>
            <TableHead className='font-semibold'>Khách hàng</TableHead>
            <TableHead className='font-semibold text-center'>Số điện thoại</TableHead>
            <TableHead className='font-semibold text-center'>Giá giữ chỗ</TableHead>
            <TableHead className='font-semibold text-center'>Trạng thái</TableHead>
            <TableHead className='font-semibold text-center'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((item: Deposit) => (
              <TableRow key={item?.depositID}>
                <TableCell>{item?.depositCode}</TableCell>
                <TableCell>{item?.apartmentCode}</TableCell>
                <TableCell>{item?.depositProfile[0]?.fullName}</TableCell>
                <TableCell className='text-center'>{item?.depositProfile[0]?.phoneNumber}</TableCell>
                <TableCell className='text-center'>{formatMoneyShortcut(item?.depositAmount)}</TableCell>
                <TableCell className='flex justify-center'>{item?.depositStatus}</TableCell>
                <TableCell className='text-center'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='cursor-pointer align-middle'>
                      {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem>
                        <Button variant='default' className='mr-2'>Chấp nhận</Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button variant='default'>Từ chối</Button>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem> */}
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
    </div>
  )
}

export default RequestDepositMangeTable