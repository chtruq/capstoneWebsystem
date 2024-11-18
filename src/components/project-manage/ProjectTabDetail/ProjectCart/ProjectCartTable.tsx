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
import { tableText, TextArea, TextPrice } from "@/lib/utils/project";
import Image from "next/image";

interface Props {
  data: Apartment[];
}

const ProjectCartTable: FC<Props> = ({ data }) => {
  const tableType = (type: string) => {
    switch (type) {
      case "0":
        return (
          <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center">
            <p className="text-money text-center">Đang mở bán</p>
          </div>
        );
      case "2":
        return (
          <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center">
            <span className="text-success">Đang mở bán</span>
          </div>
        );

      default:
        return type;
    }
  };

  console.log("dataabc", data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Mã căn hộ</TableHead>
            <TableHead className="font-semibold">Hình ảnh</TableHead>
            <TableHead className="font-semibold">Giá</TableHead>
            <TableHead className="font-semibold">Diện tích</TableHead>
            <TableHead className="font-semibold">Phòng ngủ</TableHead>
            <TableHead className="font-semibold">Nhà tắm</TableHead>
            <TableHead className="font-semibold">Dự án</TableHead>
            <TableHead className="font-semibold">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((apartment: Apartment) => (
            <TableRow key={apartment.apartmentID}>
              <TableCell>{tableText(apartment.apartmentCode)}</TableCell>
              <TableCell>
                <Image
                  src={apartment?.images?.[0]?.imageUrl}
                  width={70}
                  height={70}
                  alt="Ảnh"
                  className="rounded-md w-12 h-12"
                />
              </TableCell>
              <TableCell>{TextPrice(apartment.price)}</TableCell>
              <TableCell>{TextArea(apartment.area)}</TableCell>
              <TableCell>{tableText(apartment.numberOfRooms)}</TableCell>
              <TableCell>{tableText(apartment.numberOfBathrooms)}</TableCell>
              <TableCell>{tableText(apartment.projectApartmentName)}</TableCell>
              <TableCell>{tableType(apartment.apartmentStatus)}</TableCell>
              <TableCell className="gap-1 flex">
                <Button variant="outline">Chi tiết</Button>
                <Button variant="outline">Sửa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectCartTable;
