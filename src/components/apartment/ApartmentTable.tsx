import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getApartmentsTest } from "@/app/actions/apartment";

interface Props {
  query: string;
  currentPage: number;
}

const ApartmentTable: FC<Props> = async ({ query, currentPage }: Props) => {
  let data;
  try {
    data = await getApartmentsTest({ query, currentPage });
    console.log(data?.data?.data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Giá căn hộ</TableHead>
              <TableHead>Loại căn hộ</TableHead>
              <TableHead>Thuộc dự án</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.data?.apartments?.map((apartment: Apartment) => (
              <TableRow key={apartment.apartmentID}>
                <TableCell>{apartment.apartmentCode}</TableCell>
                <TableCell>{apartment.apartmentName}</TableCell>
                <TableCell>{apartment.address}</TableCell>
                <TableCell>{apartment.price}</TableCell>
                <TableCell>{apartment.apartmentType}</TableCell>
                <TableCell>{apartment.projectApartmentName}</TableCell>
                <TableCell className="gap-1 flex">
                  <Button variant="outline">Sửa</Button>
                  <Button variant="outline">Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ApartmentTable;
