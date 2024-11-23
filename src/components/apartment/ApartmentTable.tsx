import React, { FC } from "react";

import { getApartmentsTest, getApartmentsPendingRequest } from "@/app/actions/apartment";
import ApartmentManageTable from "./ApartmentManageTable";
import { getUserInfoFromCookies } from "@/app/actions/auth";


interface Props {
  query: string;
  currentPage: number;
  state: string;
}

const ApartmentTable: FC<Props> = async ({ query, currentPage, state }: Props) => {
  let data;
  try {
    if (state === "pending-request") {
      console.log("Fetching apartments in pending request state...");
      data = await getApartmentsPendingRequest({ query, currentPage });
    } else if (state === "list-apt") {
      console.log("Fetching apartments in detail state...");
      data = await getApartmentsTest({ query, currentPage });
    }
  } catch (error) {
    console.log("Error fetching apartments:", error);
  }

  let userToken = await getUserInfoFromCookies();
  console.log("User Token from apartment table", userToken);
  
  console.log("Data apartment", data?.data?.data?.apartments);


  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <ApartmentManageTable data={data?.data?.data?.apartments} state={{ state, currentPage }} role={userToken.role} />
        </>
      )}
    </div>
  );
};

export default ApartmentTable;
