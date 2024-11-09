import RequestComponent from "@/components/dashboard/RequestComponent";
import React from "react";

const RequestManage = async ({ searchParams }: { searchParams: any }) => {
  const page = searchParams.page ?? 1;
  const limit = searchParams.limit ?? 10;
  // const data = await getRequestList(page, limit)

  return (
    <div>
      <RequestComponent />
    </div>
  );
};

export default RequestManage;
