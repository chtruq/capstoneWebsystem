import React, { FC } from "react";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { getConsignment } from "@/app/actions/consignment";
import ConsignmentManageTable from "./ConsignmentManageTable";


interface Props {
  query: string;
  currentPage: number;
}
const ConsignmentTable: FC<Props> = async ({ query, currentPage }: Props) => {
  // const dataConsignment = await getConsignmentTest({ query, currentPage });
  const dataConsignment = await getConsignment({ query, currentPage });
  console.log("Data in consignmentTable", dataConsignment);

  const totalPages = dataConsignment?.totalPages;
  // console.log("Total pages in consignment", totalPages);

  return (
    <div>
      {!dataConsignment ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <ConsignmentManageTable data={dataConsignment?.verifications} />
          <div >
            {totalPages > 1 ? (
              <PaginationComponent totalPages={totalPages} />
            ) : (
              <></>
            )}
          </div>
        </>
      )
      }
    </div >
  );
};

export default ConsignmentTable;