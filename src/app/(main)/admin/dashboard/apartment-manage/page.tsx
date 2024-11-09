import { getApartments } from "@/app/actions/apartment";
import ApartmentManageComponent from "@/components/apartment/ApartmentManage";
import React from "react";

const ApartmentManage = async ({ searchParams }: { searchParams: any }) => {
  const page = searchParams.page || 1;
  const pageSize = searchParams.pageSize || 10;
  const data: Apartment[] = await getApartments(page, pageSize);

  return (
    <div>
      <div>
        <ApartmentManageComponent data={data} />
      </div>
    </div>
  );
};

export default ApartmentManage;
