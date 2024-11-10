import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequestAppointment } from "@/app/actions/apointment";
import { getPropertyRequest } from "@/app/actions/property";
import { getDeposit } from "@/app/actions/deposit";

interface Props {
  type: number;
}

const RequestTable: FC<Props> = ({ type }) => {
  const [data, setData] = useState<any>();
  const getRequest = async () => {
    try {
      if (type === 1) {
        const data = await getDeposit();
        setData(data);
      } else if (type === 2) {
        const data = await getRequestAppointment();
        setData(data);
      } else if (type === 3) {
        const data = await getPropertyRequest();
        setData(data);
        console.log(data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData([]);
    getRequest();
  }, [type]);

  const header1 = [
    { label: "Mã yêu cầu", key: "depositID" },
    { label: "Mã căn hộ", key: "apartmentID" },
    { label: "Tên căn hộ", key: "depositProfile[0].fullName" },
    { label: "Tên khách hàng", key: "depositAmount" },
    { label: "Số điện thoại", key: "depositProfile[0].phoneNumber" },
    { label: "Địa chỉ", key: "createDate" },
    { label: "Giá mong muốn", key: "depositStatus" },
  ];

  const header3 = [
    { label: "Mã yêu cầu", key: "requestId" },
    { label: "Tên căn hộ", key: "propertyName" },
    { label: "Tên khách hàng", key: "userName" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Địa chỉ", key: "address" },
    { label: "Giá mong muốn", key: "expectedPrice" },
    { label: "Ngày tạo", key: "requestDate" },
  ];

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {type === 1 &&
                header1.map((item) => (
                  <TableHead key={item.label}>{item.label}</TableHead>
                ))}

              {type === 3 &&
                header3.map((item) => (
                  <TableHead key={item.label}>{item.label}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {type === 1 &&
              data?.data?.data?.map((item: Deposit) => (
                <TableRow key={item.depositID}>
                  <TableCell>{item.depositID}</TableCell>
                  <TableCell>{item.apartmentID}</TableCell>
                  <TableCell>
                    {item.depositProfile?.[0]?.fullName || "N/A"}
                  </TableCell>
                  <TableCell>{item.depositAmount}</TableCell>
                  <TableCell>
                    {item.depositProfile?.[0]?.phoneNumber || "N/A"}
                  </TableCell>
                  <TableCell>{item.createDate}</TableCell>
                  <TableCell>{item.depositStatus}</TableCell>
                </TableRow>
              ))}

            {type === 3 &&
              data?.data?.data?.map((item: PropertyRequest) => (
                <TableRow key={item.requestID}>
                  <TableCell>{item.requestID}</TableCell>
                  <TableCell>{item.propertyName}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.expectedPrice}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RequestTable;
