import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const RequestTable = () => {
  const headerTable = [
    { label: "Mã yêu cầu", key: "requestId" },
    { label: "Mã căn hộ", key: "apartmentId" },
    { label: "Ngày giờ", key: "requestTime" },
    { label: "Tên khách hàng", key: "customerName" },
    { label: "Nhân viên", key: "staffName" },
    { label: "Trạng thái", key: "status" },
    { label: "Hành động", key: "action" },
  ];
  const data = [
    {
      requestId: "INV001",
      apartmentId: "AP001",
      requestTime: "2021-10-10 10:00",
      customerName: "Nguyễn Văn A",
      staffName: "Nguyễn Văn B",
      status: "Đã hoàn thành",
      action: "Xem chi tiết",
    },
    {
      requestId: "INV002",
      apartmentId: "AP002",
      requestTime: "2021-10-10 10:00",
      customerName: "Nguyễn Văn A",
      staffName: "Nguyễn Văn B",
      status: "Đã hoàn thành",
      action: "Xem chi tiết",
    },
    {
      requestId: "INV003",
      apartmentId: "AP003",
      requestTime: "2021-10-10 10:00",
      customerName: "Nguyễn Văn A",
      staffName: "Nguyễn Văn B",
      status: "Đã hoàn thành",
      action: "Xem chi tiết",
    },
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headerTable.map((item) => (
              <TableHead key={item.label}>{item.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.requestId}</TableCell>
              <TableCell>{item.apartmentId}</TableCell>
              <TableCell>{item.requestTime}</TableCell>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>{item.staffName}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="absolute bottom-0 right-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RequestTable;
