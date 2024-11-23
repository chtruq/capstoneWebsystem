import { getApartmentsTest } from "@/app/actions/apartment";
import ApartmentTable from "@/components/apartment/ApartmentTable";
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
      <h1 className="text-2xl font-semibold">Danh sách chờ duyệt</h1>
      <ApartmentTable query={query} currentPage={currentPage} />
    </div>
  );
}

export default PendingRequestPage;
