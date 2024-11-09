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
  data: Apartment[];
}

const ApartmentTable: FC<Props> = ({ data }) => {
  return (
    <div>
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
          {data?.map((apartment: Apartment) => (
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
    </div>
  );
};

export default ApartmentTable;
