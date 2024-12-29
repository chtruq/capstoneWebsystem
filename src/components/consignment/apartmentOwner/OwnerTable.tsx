import React, { FC } from "react";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { searchOwners } from "@/app/actions/apartmentOwer";
import OwnerManageTable from "./OwnerManageTable";

interface Props {
  query: string;
  currentPage: number;
}

const OwnerTable: FC<Props> = async ({ query, currentPage }: Props) => {
  const dataOwner = await searchOwners({ query, currentPage });
  console.log("Data in OwnerTable", dataOwner);
  const totalPages = dataOwner?.totalPages;


  return (
    <>
      {!dataOwner ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <OwnerManageTable data={dataOwner?.owners} />
          <div >
            {totalPages > 1 ? (
              <PaginationComponent totalPages={totalPages} />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  )
};

export default OwnerTable;