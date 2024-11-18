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
import Image from "next/image";
import Link from "next/link";

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
              <TableHead>Mã căn hộ</TableHead>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Diện tích</TableHead>
              <TableHead>Phòng ngủ</TableHead>
              <TableHead>Nhà tắm</TableHead>
              <TableHead>Thuộc dự án</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.data?.apartments?.map((apartment: Apartment) => (
              <TableRow key={apartment.apartmentID}>
                <TableCell>{apartment.apartmentCode}</TableCell>
                <TableCell>
                  <Image
                    src={apartment?.images[0]?.imageUrl}
                    width={50}
                    height={50}
                    alt={apartment.apartmentName}
                    className="rounded-lg w-16 h-16"
                  />
                </TableCell>
                <TableCell>{apartment.price}</TableCell>
                <TableCell>{apartment.area}</TableCell>
                <TableCell>{apartment.numberOfRooms}</TableCell>
                <TableCell>{apartment.numberOfBathrooms}</TableCell>
                <TableCell>{apartment.projectApartmentName}</TableCell>
                <TableCell>{apartment.apartmentStatus}</TableCell>
                <TableCell className="flex justify-center items-center">
                  <Link
                    href={`/manager/dashboard/apartment-manage/${apartment.apartmentID}`}
                  >
                    <Button className="items-center" variant="outline">
                      Xem chi tiết
                    </Button>
                  </Link>
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
