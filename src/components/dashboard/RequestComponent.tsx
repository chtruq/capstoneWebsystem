"use client";

import React from "react";
import { Button } from "../ui/button";
import RequestTable from "./table/RequestTable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const RequestComponent = () => {
  const overview = [
    { name: "Tổng yêu cầu", value: 10 },
    { name: "Đặt cọc", value: 5 },
    { name: "Tham quan căn hộ", value: 2 },
    { name: "Ký gửi căn hộ", value: 3 },
  ];

  const requestType = [
    { id: 1, name: "Yêu cầu đặt cọc", value: 5 },
    { id: 2, name: "Yêu cầu tham quan căn hộ", value: 2 },
    { id: 3, name: "Yêu cầu ký gửi căn hộ", value: 3 },
  ];
  const [selectedRequest, setSelectedRequest] = React.useState(1);

  return (
    <div>
      <h3 className="text-2xl">Danh sách yêu cầu</h3>
      <div className="flex w-[100%] bg-white shadow-sm border rounded-lg p-4 gap-4 ">
        {overview.map((item) => (
          <>
            <div
              className="w-[25%] justify-center items-center border-r "
              key={item.name}
            >
              <p className="text-money text-lg font-medium">{item.name}</p>
              <p className="text-lg">{item.value}</p>
            </div>
          </>
        ))}
      </div>
      <div className="flex mt-8 gap-5">
        {requestType.map((item) => (
          <Button
            onClick={() => {
              setSelectedRequest(item.id);
            }}
            key={item.id}
            variant="outline"
            className={`${
              selectedRequest === item.id
                ? "bg-white text-money border-money font-medium"
                : "bg-white"
            } `}
          >
            <p>{item.name}</p>
            <p
              className={`${
                selectedRequest === item.id
                  ? "bg-primary text-money border-money text-center font-medium p-1 rounded-sm"
                  : " bg-gray-200 font-medium p-1 rounded-sm text-center"
              }`}
            >
              {item.value}
            </p>
          </Button>
        ))}
      </div>
      <div>
        {
          // List of request
          selectedRequest === 1 ? (
            <>
              <RequestTable type={selectedRequest} />
            </>
          ) : selectedRequest === 2 ? (
            <>
              <RequestTable type={selectedRequest} />
            </>
          ) : (
            <>
              <RequestTable type={selectedRequest} />
            </>
          )
        }
      </div>
      <div className="absolute bottom-0 right-0"></div>
    </div>
  );
};

export default RequestComponent;
