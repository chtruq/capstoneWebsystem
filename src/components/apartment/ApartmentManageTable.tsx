import React, { FC } from "react";
import { Button } from "../ui/button";
import ApartmentTable from "./ApartmentTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getUserInfoFromCookies } from "@/app/actions/auth";

interface Props {
  data: Apartment[];
}


const ApartmentManageTable: FC<Props> = async ({ data }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  const userToken = await getUserInfoFromCookies();
  let role = userToken.role.toString().toLowerCase();
  if (role === "management") {
    role = "manager";
  } else {
    role = role;
  }
  console.log("User Tolken", userToken);
  console.log("User role", role);

  return (
    <div>
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
          {data?.map((apartment: Apartment) => (
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
                {/* <Button
                  onClick={() => {
                    router.push(
                      `${pathname}/${apartment.apartmentID}/detail`
                    );
                  }}
                  variant="outline"
                >
                  Chi tiết
                </Button> */}
                <Link
                  href={`/${role}/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
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
    </div>
  );
};

export default ApartmentManageTable;
