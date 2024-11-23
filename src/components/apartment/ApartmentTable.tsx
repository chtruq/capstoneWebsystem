import React, { FC } from "react";

import { getApartmentsTest } from "@/app/actions/apartment";
import ApartmentManageTable from "./ApartmentManageTable";


interface Props {
  query: string;
  currentPage: number;
}

const ApartmentTable: FC<Props> = async ({ query, currentPage }: Props) => {
  let data;
  try {
    data = await getApartmentsTest({ query, currentPage });
  } catch (error) {
    console.log(error);
  }

  console.log("Data apartment", data?.data?.data?.apartments);


  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <ApartmentManageTable data={data?.data?.data?.apartments} />
        </>
      )}
    </div>
  );
};

export default ApartmentTable;
