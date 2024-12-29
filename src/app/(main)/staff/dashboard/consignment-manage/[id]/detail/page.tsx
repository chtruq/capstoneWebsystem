import { getConsignmentDetail } from "@/app/actions/consignment";
import ConsignmentDetail from "@/components/consignment/detail/ConsignmentDetail";
import React from "react";

const ConsignmentDetails = async ({ params }: { params: { id: string } }) => {
  // console.log("params in detail", params);

  const data = await getConsignmentDetail({ verificationID: params.id });
  // console.log("Data in consignment detail", data);

  return (
    <div>
      <h1 className="font-semibold text-2xl">Chi tiết hợp đồng</h1>
      <div>
        <ConsignmentDetail data={data} />
      </div>
    </div>
  );
}

export default ConsignmentDetails;