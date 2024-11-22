import { getApartmentDetails } from "@/app/actions/apartment";
import ApartmentDetail from "@/components/apartment/detail/ApartmentDetail";
import React from "react";

const ApartmentDetails = async ({ params }: { params: { id: string } }) => {
  const data = await getApartmentDetails({ id: params.id });

  return (
    <div>
      <h1 className="font-semibold text-2xl">Chi tiết căn hộ</h1>
      <div>
        <ApartmentDetail data={data} />
      </div>
    </div>
  );
};

export default ApartmentDetails;
