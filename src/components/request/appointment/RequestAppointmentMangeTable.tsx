import React, { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../ui/button";

interface Props {
  data: any
}

const RequestAppointmentMangeTable: FC<Props> = ({ data }) => {
  console.log("Data in Mange Table", data);
  
  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-semibold'>Mã yêu cầu</TableHead>
            <TableHead className='font-semibold'>Mã căn hộ</TableHead>
            <TableHead className='font-semibold'>Khách hàng</TableHead>
            <TableHead className='font-semibold'>Số điện thoại</TableHead>
            <TableHead className='font-semibold'>Khung giờ</TableHead>
            <TableHead className='font-semibold'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data?.map((item: any) => (
              <TableRow key={item?.requestID}>
                <TableCell>{item?.requestID}</TableCell>
                <TableCell>{item?.apartmentID}</TableCell>
                <TableCell>{item?.username}</TableCell>
                <TableCell>{item?.phoneNumber}</TableCell>
                <TableCell>{item?.preferredDate}</TableCell>
                <TableCell>
                  <div className='flex justify-center'>
                    <Button variant='default' className='mr-2'>Chấp nhận</Button>
                    <Button variant='default'>Từ chối</Button>
                  </div>
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

export default RequestAppointmentMangeTable