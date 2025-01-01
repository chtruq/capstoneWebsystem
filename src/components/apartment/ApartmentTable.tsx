import React, { FC } from "react";

import { getApartmentsTest, getApartmentsPendingRequest } from "@/app/actions/apartment";
import ApartmentManageTable from "./ApartmentManageTable";
import { getUserInforFromCookie } from "@/app/actions/auth";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import { getTeamByAccountId } from "@/app/actions/team";


interface Props {
  query: string;
  currentPage: number;
  state: string;
}

const ApartmentTable: FC<Props> = async ({ query, currentPage, state }: Props) => {
  let data;

  const userToken = await getUserInforFromCookie();
  console.log("User Token from apartment table", userToken);

  const teamData = await getTeamByAccountId(userToken?.id);
  console.log("Team data", teamData?.teamID);

  try {
    if (state === "pending-request") {
      console.log("Fetching apartments in pending request state...");
      data = await getApartmentsPendingRequest({ teamId: teamData.teamID, query, currentPage });
    } else if (state === "list-apt") {
      console.log("Fetching apartments in detail state...");
      data = await getApartmentsTest({ query, currentPage });
    }
  } catch (error) {
    console.log("Error fetching apartments:", error);
  }

  console.log("Data apartment", data?.data?.data);
  const totalPages = data?.data?.data?.totalPages;
  console.log("Total pages", totalPages);

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <ApartmentManageTable data={data?.data?.data?.apartments} state={{ state, currentPage }} role={userToken?.role} />
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
};

export default ApartmentTable;
