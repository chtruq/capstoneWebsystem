import { getApartmentsTest } from "@/app/actions/apartment";
import { get } from "http";
import React from "react";

async function PendingRequestPage(props: {
  searchParams?: Promise<{
    apartmentName?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.apartmentName || "";
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await getApartmentsTest({ query, currentPage });

  return (
    <div>
      <h1>Danh sách chờ duyệt</h1>
    </div>
  );
}

export default PendingRequestPage;
