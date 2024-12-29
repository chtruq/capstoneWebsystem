import React, { FC } from "react";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { getRequestProperty } from "@/app/actions/consignment";
import RequestPropertyMangeTable from "./RequestPropertyMangeTable";

interface Props {
  query: string;
  currentPage: number;
}


const RequestPropertyTable: FC<Props> = async ({ query, currentPage }) => {
  const data = await getRequestProperty({ query, currentPage });
  console.log("Data request property", data);

  const totalPages = data.totalPages;
  // console.log("Total pagessss", totalPages);

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (

        <div >
          <RequestPropertyMangeTable data={data.results} />
          {totalPages > 1 ? (
            <PaginationComponent totalPages={totalPages} />
          ) : (
            <></>
          )}
        </div>
      )}

    </div>
  );
}

export default RequestPropertyTable;