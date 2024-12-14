import { getRequestAppointmentByTeam } from "@/app/actions/apointment";
import React, { FC } from "react";
import RequestAppointmentMangeTable from "./RequestAppointmentMangeTable";
import PaginationComponent from "@/components/pagination/PaginationComponent";

interface Props {
  query: string;
  currentPage: number;
  teamID: string;
}

const RequestAppointmentTable: FC<Props> = async ({ query, currentPage, teamID }) => {
  // console.log("Appointmentttt");
  // console.log("Query", query);
  // console.log("Current Page", currentPage);
  // console.log("Team ID", teamID);

  const data = await getRequestAppointmentByTeam({ query, currentPage, teamID });
  console.log("Data request appointment", data);
  const totalPages = data.totalPages;
  console.log("Total pages", totalPages);
  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <RequestAppointmentMangeTable data={data.results} />
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

export default RequestAppointmentTable;