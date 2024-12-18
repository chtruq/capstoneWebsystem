import { getRequestAppointmentByTeam } from "@/app/actions/apointment";
import React, { FC } from "react";
import RequestAppointmentMangeTable from "../appointment/RequestAppointmentMangeTable";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { getRequestDepositByTeam } from "@/app/actions/deposit";
import RequestDepositMangeTable from "./RequestDepositMangeTable";

interface Props {
  query: string;
  currentPage: number;
  teamID: string;
}

const RequestDepositTable: FC<Props> = async ({ query, currentPage, teamID }) => {
  // console.log("Appointmentttt");
  // console.log("Query", query);
  // console.log("Current Page", currentPage);
  // console.log("Team ID", teamID);

  const data = await getRequestDepositByTeam({ query, currentPage, teamID });
  // console.log("Data request deposit", data);
  const totalPages = data.totalPages;
  console.log("Total pages", totalPages);
  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <RequestDepositMangeTable  data={data.deposits} />
          <div >
            {totalPages > 1 ? (
              <PaginationComponent totalPages={totalPages} />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RequestDepositTable;