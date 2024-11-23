"use client";
import React, { FC, useState, useEffect } from "react";
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
import Image from "next/image";
import { getUserInfoFromCookies } from "@/app/actions/auth";
import { approveApartment, rejectApartment } from "@/app/actions/apartment";
import { getApartmentsTest, getApartmentsPendingRequest } from "@/app/actions/apartment";

interface Props {
  data: Apartment[];
  state: {
    state: string;
    currentPage: number;
  };
  role: string;
}


const ApartmentManageTable: FC<Props> = ({ data, state, role }) => {

  role = role.toString().toLowerCase();
  const [dataReload, setDataReload] = useState(data);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch lại dữ liệu mỗi khi refreshKey thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedData = await getApartmentsPendingRequest({
          query: "",
          currentPage: state.currentPage, // Cập nhật theo logic của bạn
        });
        setDataReload(updatedData?.data?.data?.apartments);
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleApprove = async (id: string) => {
    try {
      await approveApartment({ id });
      setRefreshKey((prev) => prev + 1); // Làm mới dữ liệu
    } catch (error) {
      console.error("Error approving apartment:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectApartment({ id });
      setRefreshKey((prev) => prev + 1); // Làm mới dữ liệu
    } catch (error) {
      console.error("Error rejecting apartment:", error);
    }
  };

  console.log("state ahuhu", state);
  console.log("User role from manage", role);
  if (role === "management") {
    role = "manager";
  }
  console.log("User role from manage after", role);
  console.log(" Current page", state.currentPage);


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
                <Link
                  href={`/${role}/dashboard/apartment-manage/${apartment.apartmentID}/detail`}
                >
                  <Button className="items-center" variant="outline" >
                    Xem chi tiết
                  </Button>
                </Link>
                {state.state === "pending-request" ? (
                  <>
                    <Button className="items-center" variant="outline" onClick={() => handleApprove(apartment.apartmentID)}>
                      Duyệt
                    </Button>
                    <Button className="items-center" variant="outline" onClick={() => handleReject(apartment.apartmentID)}>
                      Từ chối
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
};

export default ApartmentManageTable;
