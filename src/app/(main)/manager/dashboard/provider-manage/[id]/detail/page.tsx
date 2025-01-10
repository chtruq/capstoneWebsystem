import { getProviderDetails } from "@/app/actions/provider";
import ProviderTabsDetails from "@/components/provider/ProviderTabDetail/ProviderTabDetail";
import React from "react";

const ProviderDetail = async ({ params }: { params: { id: string } }) => {
  console.log("apartmentProjectProviderID:", params);
  const data = await getProviderDetails({ id: params.id });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Chi tiết nhà cung cấp</h1>
      <ProviderTabsDetails data={data} />
    </div>
  );
}
export default ProviderDetail;